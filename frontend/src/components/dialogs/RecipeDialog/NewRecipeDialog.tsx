import { Form, Formik, type FormikProps } from "formik";
import type { RecipeDetailModelDto } from "../../../models/recipe/RecipeDetailModelDto.ts";
import { CustomButton } from "../../CustomButton.tsx";
import { CustomTextField } from "../../form/CustomTextField.tsx";
import { useRef, useState } from "react";
import { MultiChipInput } from "../../form/MultiChipInput.tsx";
import { useAllTags } from "../../../hooks/useAllTags.ts";
import { useAllAllergens } from "../../../hooks/useAllAllergens.ts";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FatsecretIngredientDialog } from "./FatsecretIngredientDialog.tsx";
import type { RecipeIngredientModel } from "../../../models/recipe/RecipeIngredientModel.ts";
import type { NutritionValuesModel } from "../../../models/recipe/NutritionValuesModel.ts";
import { CustomNumberField } from "../../form/CustomNumberField.tsx";
import { CustomFieldGroup } from "../../form/CustomFieldGroup.tsx";
import { CustomDialog } from "../../form/CustomDialog.tsx";
import * as Yup from "yup";
import { DragAndDropInput } from "../../form/DragAndDropInput.tsx";
import { calculateTotal } from "./calculationHelpers.ts";
import { NutritionValuesFields } from "./NutritionValuesFields.tsx";
import type { AllergenModel } from "../../../models/recipe/AllergenModel.ts";
import { DoubleFieldArray } from "./DoubleFieldArray.tsx";

export type RecipeFormValues = Omit<RecipeDetailModelDto, "ingredients"> & {
  ingredients: {
    name: string;
    ingredients: (RecipeIngredientModel & {
      baseNutritionValues: NutritionValuesModel;
    })[];
  }[];
};

export function NewRecipeDialog(props: { open: boolean; onClose: () => void }) {
  const { open, onClose } = props;
  const [showFatsecretDialog, setShowFatsecretDialog] = useState(false);
  const { data: allTags } = useAllTags();
  const { data: allAllergens } = useAllAllergens();
  const queryClient = useQueryClient();
  const formikRef = useRef<FormikProps<RecipeFormValues>>(null);

  const initialValues: RecipeFormValues = {
    title: "",
    ingredients: [
      {
        name: "main",
        ingredients: [],
      },
    ],
    steps: [
      {
        name: "main",
        steps: [],
      },
    ],
    nutritionValues: {
      fat: 0,
      protein: 0,
      carbs: 0,
      calories: 0,
      skaldeman: 0,
    },
    preparationTime: 0,
    cookingTime: 0,
    defaultPortions: 1,
    tags: [],
    image: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    ingredients: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(),
          ingredients: Yup.array()
            .of(
              Yup.object().shape({
                name: Yup.string().required(),
                amount: Yup.number().required(),
                unit: Yup.string().required(),
                nutritionValues: Yup.object().shape({
                  fat: Yup.number().required(),
                  protein: Yup.number().required(),
                  carbs: Yup.number().required(),
                  calories: Yup.number().required(),
                }),
              }),
            )
            .min(1),
        }),
      )
      .min(1),
    steps: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(),
          steps: Yup.array().of(Yup.string().required()).min(1),
        }),
      )
      .min(1),
    nutritionValues: Yup.object().shape({
      fat: Yup.number().required(),
      protein: Yup.number().required(),
      carbs: Yup.number().required(),
      calories: Yup.number().required(),
      skaldeman: Yup.number().required(),
    }),
    preparationTime: Yup.number().required(),
    cookingTime: Yup.number().required(),
    defaultPortions: Yup.number().required(),
    tags: Yup.array().of(Yup.string().required()),
    image: Yup.string().required(),
  });

  const handleAddTags = (tags: string[]) => {
    axios.post("/api/tag", tags).catch((e) => console.error(e.response.data));
  };

  const handleAddAllergens = (allergens: string[]) => {
    axios
      .post("/api/allergen", allergens)
      .catch((e) => console.error(e.response.data));
  };

  const handleSubmit = (values: RecipeDetailModelDto) => {
    const filteredTags = values.tags.filter(
      (tag) => !allTags?.map((t) => t.tag).includes(tag),
    );
    const filteredAllergens = values.ingredients
      .flatMap((group) => group.ingredients)
      .flatMap((ingredient) => ingredient.allergens || [])
      .filter(
        (allergen) => !allAllergens?.map((a) => a.allergen).includes(allergen),
      );

    handleAddTags(filteredTags);
    handleAddAllergens(filteredAllergens);

    axios
      .post("/api/recipe", {
        ...values,
        ingredients: values.ingredients.map((group) => ({
          ...group,
          ingredients: group.ingredients.map((ingredient) => ({
            ...ingredient,
            allergens: ingredient.allergens?.length
              ? ingredient.allergens
              : null,
          })),
        })),
        nutritionValues: {
          ...values.nutritionValues,
          skaldeman: Number(values.nutritionValues.skaldeman),
        },
      })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["getAllRecipes"] });
        onClose();
        formikRef.current?.resetForm();
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        innerRef={formikRef}
        validationSchema={validationSchema}
        isInitialValid={false}
      >
        {({ values, setFieldValue, isValid }) => (
          <Form
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            <CustomDialog
              open={open}
              title="Neues Rezept"
              onClose={() => {
                onClose();
                formikRef.current?.resetForm();
              }}
              canSave={isValid}
              hasSave
            >
              <div className="grid grid-cols-2 gap-5">
                <CustomTextField label="Titel" name="title" />
                <CustomFieldGroup groupLabel="Zutaten" className="col-span-2">
                  <DoubleFieldArray
                    name="ingredients"
                    ingredients={values.ingredients}
                    formikRef={formikRef}
                    allAllergens={allAllergens as AllergenModel[]}
                    setShowFatsecretDialog={setShowFatsecretDialog}
                    addSingleLabel="leere Zutat hinzufügen"
                    addGroupLabel="Zutatengruppe hinzufügen"
                    removeSingleLabel="Zutat entfernen"
                  />
                </CustomFieldGroup>
                <CustomFieldGroup groupLabel="Schritte" className="col-span-2">
                  <DoubleFieldArray
                    steps={values.steps}
                    name="steps"
                    formikRef={formikRef}
                    addSingleLabel="Schritt hinzufügen"
                    addGroupLabel="Schrittgruppe hinzufügen"
                    removeSingleLabel="Schritt entfernen"
                  />
                </CustomFieldGroup>
                <CustomFieldGroup groupLabel="Nährwerte" className="col-span-2">
                  <div className="grid grid-cols-2 gap-2">
                    <NutritionValuesFields namePrefix="nutritionValues" />
                    <div className="col-span-2 grid grid-cols-4 gap-5">
                      <CustomNumberField
                        name="nutritionValues.skaldeman"
                        label="Skaldeman"
                        min={0}
                      />
                      <CustomButton
                        label="Nährwerte berechnen"
                        onClick={() => {
                          calculateTotal(values, setFieldValue);
                        }}
                        className="col-span-3 self-end justify-self-end"
                      />
                    </div>
                  </div>
                </CustomFieldGroup>
                <CustomFieldGroup
                  groupLabel="Weitere Angaben"
                  className="col-span-2 grid grid-cols-4 gap-y-2 gap-x-5"
                >
                  <CustomNumberField
                    name="preparationTime"
                    label="Vorbereitung (Min)"
                    min={0}
                  />
                  <CustomNumberField
                    name="cookingTime"
                    label="Zubereitung (Min)"
                    min={0}
                  />
                  <CustomNumberField
                    name="defaultPortions"
                    label="Portionen"
                    min={1}
                  />
                  <MultiChipInput
                    label="Tags"
                    options={allTags?.map((t) => t.tag) || []}
                    name="tags"
                    className="row-start-3 col-span-2"
                  />
                  <DragAndDropInput name="image" className="col-span-4" />
                </CustomFieldGroup>
              </div>
            </CustomDialog>
          </Form>
        )}
      </Formik>
      <FatsecretIngredientDialog
        allAllergens={allAllergens || []}
        open={showFatsecretDialog}
        onClose={() => {
          setShowFatsecretDialog(false);
        }}
      />
    </>
  );
}
