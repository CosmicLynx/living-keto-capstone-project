import { CustomButton } from "../../CustomButton.tsx";
import { useFatsecretSearch } from "../../../hooks/useFatsecretSearch.ts";
import { useFatsecretIngedientById } from "../../../hooks/useFatsecretIngedientById.ts";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CustomDialog } from "../../form/CustomDialog.tsx";
import { CustomTextField } from "../../form/CustomTextField.tsx";
import type { IngredientModel } from "../../../models/recipe/IngredientModel.ts";
import { FieldArray, Form, Formik, type FormikProps } from "formik";
import axios from "axios";
import { MultiChipInput } from "../../form/MultiChipInput.tsx";
import type { AllergenModel } from "../../../models/recipe/AllergenModel.ts";
import { translatedUnits, type Units } from "../../../models/recipe/Units.ts";
import { CustomDropdownInput } from "../../form/CustomDropdownInput.tsx";
import type { NutritionValuesModel } from "../../../models/recipe/NutritionValuesModel.ts";
import { CustomNumberField } from "../../form/CustomNumberField.tsx";
import type { FatsecretFoodsModel } from "../../../models/recipe/fatsecret/FatsecretFoodsModel.ts";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";

type IngredientValues = Omit<IngredientModel, "nutritionValuesPerUnit"> & {
  search: string;
  nutritionValuesPerUnit: {
    unit: Units;
    defaultAmount: number;
    nutritionValues: NutritionValuesModel;
    servingDescription?: string;
    servingAmount?: number;
    servingUnit?: string;
  }[];
};

export function FatsecretIngredientDialog(props: {
  allAllergens: AllergenModel[] | undefined;
  open: boolean;
  onClose: () => void;
}) {
  const { allAllergens, onClose, open } = props;
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [id, setId] = useState<string | undefined>(undefined);
  const [showList, setShowList] = useState(false);
  const [fatsecretIngredients, setFatsecretIngredients] = useState<
    FatsecretFoodsModel | undefined
  >(undefined);
  const { data: fatsecretSearchResults, isLoading: isSearchLoading } =
    useFatsecretSearch(submittedSearch);
  const { data: fatsecretIngredientDetails, isLoading: isDetailsLoading } =
    useFatsecretIngedientById(id);
  const queryClient = useQueryClient();

  useEffect(() => {
    setShowList(false);
    if (submittedSearch) {
      queryClient
        .invalidateQueries({
          queryKey: ["getFatsecretSearch", submittedSearch],
        })
        .then(() => {
          setFatsecretIngredients(fatsecretSearchResults);
          setShowList(true);
        });
    } else {
      setFatsecretIngredients(undefined);
    }
  }, [fatsecretSearchResults, queryClient, submittedSearch]);

  const initialValues: IngredientValues = {
    search: "",
    id: "",
    name: "",
    nutritionValuesPerUnit: [],
    allergens: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    nutritionValuesPerUnit: Yup.array()
      .of(
        Yup.object().shape({
          unit: Yup.string().required(),
          defaultAmount: Yup.number().required(),
          nutritionValues: Yup.object().shape({
            fat: Yup.number().required(),
            protein: Yup.number().required(),
            carbs: Yup.number().required(),
            calories: Yup.number().required(),
          }),
        }),
      )
      .min(1),
  });

  const handleAddIngredient = async (values: IngredientModel) => {
    await axios
      .post("/api/ingredient/new", {
        ...values,
        nutritionValuesPerUnit: values.nutritionValuesPerUnit.map(
          (nutritionValuesPerUnit) => ({
            ...nutritionValuesPerUnit,
            nutritionValues: {
              fat: Number(nutritionValuesPerUnit.nutritionValues.fat),
              protein: Number(nutritionValuesPerUnit.nutritionValues.protein),
              carbs: Number(nutritionValuesPerUnit.nutritionValues.carbs),
              calories: Number(nutritionValuesPerUnit.nutritionValues.calories),
              skaldeman: Number(
                nutritionValuesPerUnit.nutritionValues.skaldeman,
              ),
            },
          }),
        ),
      })
      .then(() => {
        formikRef.current?.setValues(initialValues);
        onClose();
      })
      .catch((e) => console.error(e.response.data));
  };

  const formikRef = useRef<FormikProps<IngredientValues>>(null);

  useEffect(() => {
    const food = fatsecretIngredientDetails?.food;
    if (!food) return;

    const newValues: IngredientValues = {
      search: submittedSearch || "",
      id: food.food_id || "",
      name: food.food_name || "",
      nutritionValuesPerUnit:
        food?.servings?.serving?.map((serving) => ({
          unit: "NONE",
          defaultAmount: Number(serving.metric_serving_amount),
          servingDescription: serving.serving_description,
          servingAmount: Number(serving.metric_serving_amount),
          servingUnit: serving.metric_serving_unit,
          nutritionValues: {
            fat: Number(serving.fat),
            protein: Number(serving.protein),
            carbs: Number(serving.carbohydrate),
            calories: Number(serving.calories),
            skaldeman: 0,
          },
        })) || [],
      allergens: [],
    };

    formikRef.current?.setValues(newValues);
  }, [fatsecretIngredientDetails, submittedSearch]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleAddIngredient}
      innerRef={formikRef}
      validationSchema={validationSchema}
    >
      {({ values, isSubmitting, isValid }) => (
        <Form
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          <CustomDialog
            size="small"
            open={open}
            onClose={() => {
              formikRef.current?.setValues(initialValues);
              onClose();
              setSubmittedSearch("");
              setShowList(false);
              setId(undefined);
            }}
            isSubmitting={isSubmitting}
            hasSave
            canSave={isValid}
            title="Neue Zutat suchen"
          >
            <CustomTextField name="search" label="Zutaten suchen" />
            <CustomButton
              label="Fatsecret-API durchsuchen"
              onClick={() => {
                setSubmittedSearch(values.search);
                if (fatsecretIngredients) setShowList(true);
                setId(undefined);
              }}
            />
            {isSearchLoading ? (
              <CircularProgress
                sx={{
                  color: "var(--color-primary)",
                }}
              />
            ) : (
              fatsecretIngredients &&
              showList && (
                <ul>
                  {fatsecretIngredients?.foods.food.map((ingredient) => (
                    <li key={ingredient.food_id}>
                      {ingredient.food_name}; {ingredient.food_description}
                      <CustomButton
                        label="Details anzeigen"
                        onClick={() => {
                          setId(ingredient.food_id);
                          queryClient.invalidateQueries({
                            queryKey: [
                              "getFatsecretIngredientById",
                              ingredient.food_id,
                            ],
                          });
                          setShowList(false);
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )
            )}
            {isDetailsLoading ? (
              <CircularProgress
                sx={{
                  color: "var(--color-primary)",
                }}
              />
            ) : (
              !!fatsecretIngredientDetails && (
                <>
                  <CustomTextField name="name" label="Zutat" />
                  <MultiChipInput
                    label="Allergene"
                    options={allAllergens?.map((a) => a.allergen) || []}
                    name="allergens"
                  />
                  <FieldArray
                    name="nutritionValuesPerUnit"
                    render={(helpers) => (
                      <div>
                        {values.nutritionValuesPerUnit &&
                        values.nutritionValuesPerUnit.length > 0 ? (
                          <>
                            {values.nutritionValuesPerUnit.map(
                              (_nutritionValues, index) => (
                                <div key={index}>
                                  <div>
                                    <CustomDropdownInput
                                      label="Einheit"
                                      name={`nutritionValuesPerUnit.${index}.unit`}
                                      options={
                                        Object.keys(translatedUnits) as Units[]
                                      }
                                      getOptionLabel={(unit) =>
                                        translatedUnits[unit] || unit
                                      }
                                    />
                                    <span>
                                      {
                                        values.nutritionValuesPerUnit[index]
                                          .servingDescription
                                      }
                                      :
                                      {
                                        values.nutritionValuesPerUnit[index]
                                          .servingAmount
                                      }{" "}
                                      {
                                        values.nutritionValuesPerUnit[index]
                                          .servingUnit
                                      }
                                    </span>
                                  </div>
                                  <CustomNumberField
                                    name={`nutritionValuesPerUnit.${index}.defaultAmount`}
                                    label="Portionsgröße (g)"
                                    min={0}
                                  />
                                  <CustomNumberField
                                    name={`nutritionValuesPerUnit.${index}.nutritionValues.fat`}
                                    label="Fett (g)"
                                    min={0}
                                  />
                                  <CustomNumberField
                                    name={`nutritionValuesPerUnit.${index}.nutritionValues.protein`}
                                    label="Eiweiß (g)"
                                    min={0}
                                  />
                                  <CustomNumberField
                                    name={`nutritionValuesPerUnit.${index}.nutritionValues.carbs`}
                                    label="KH (g)"
                                    min={0}
                                  />
                                  <CustomNumberField
                                    name={`nutritionValuesPerUnit.${index}.nutritionValues.calories`}
                                    label="Kalorien (kcal)"
                                    min={0}
                                  />
                                  <CustomButton
                                    label="Löschen"
                                    onClick={() => helpers.remove(index)}
                                  />
                                </div>
                              ),
                            )}
                            <CustomButton
                              label="neue Portionseinheit"
                              onClick={() =>
                                helpers.push({
                                  unit: "NONE",
                                  defaultAmount: 0,
                                  nutritionValues: {
                                    fat: 0,
                                    protein: 0,
                                    carbs: 0,
                                    calories: 0,
                                    skaldeman: 0,
                                  },
                                })
                              }
                            />
                          </>
                        ) : (
                          <CustomButton
                            label="neue Portionseinheit"
                            onClick={() =>
                              helpers.push({
                                unit: "NONE",
                                defaultAmount: 0,
                                nutritionValues: {
                                  fat: 0,
                                  protein: 0,
                                  carbs: 0,
                                  calories: 0,
                                  skaldeman: 0,
                                },
                              })
                            }
                          />
                        )}
                      </div>
                    )}
                  />
                </>
              )
            )}
          </CustomDialog>
        </Form>
      )}
    </Formik>
  );
}
