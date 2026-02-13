import { CustomButton } from "../../CustomButton.tsx";
import type { RecipeFormValues } from "./NewRecipeDialog.tsx";
import type { RefObject } from "react";
import { FieldArray, type FormikProps } from "formik";
import type { AllergenModel } from "../../../models/recipe/AllergenModel.ts";
import type { StepGroupModel } from "../../../models/recipe/StepGroupModel.ts";
import type { RecipeIngredientModel } from "../../../models/recipe/RecipeIngredientModel.ts";
import type { NutritionValuesModel } from "../../../models/recipe/NutritionValuesModel.ts";
import { CustomTextField } from "../../form/CustomTextField.tsx";
import { CustomNumberField } from "../../form/CustomNumberField.tsx";
import { CustomDropdownInput } from "../../form/CustomDropdownInput.tsx";
import { translatedUnits, type Units } from "../../../models/recipe/Units.ts";
import { NutritionValuesFields } from "./NutritionValuesFields.tsx";
import { recalculateNutritionValues } from "./calculationHelpers.ts";
import { MultiChipInput } from "../../form/MultiChipInput.tsx";
import { FindAndAddIngredients } from "./FindAndAddIngredients.tsx";

export function DoubleFieldArray(props: {
  name: string;
  steps?: StepGroupModel[];
  ingredients?: {
    name: string;
    ingredients: (RecipeIngredientModel & {
      baseNutritionValues: NutritionValuesModel;
    })[];
  }[];
  formikRef: RefObject<FormikProps<RecipeFormValues> | null>;
  allAllergens?: AllergenModel[];
  setShowFatsecretDialog?: (show: boolean) => void;
  addSingleLabel: string;
  addGroupLabel: string;
  removeSingleLabel: string;
}) {
  const {
    name,
    steps,
    ingredients,
    allAllergens,
    formikRef,
    setShowFatsecretDialog,
    addSingleLabel,
    addGroupLabel,
    removeSingleLabel,
  } = props;

  const emptyIngredient = {
    name: "",
    amount: 0,
    unit: "",
    nutritionValues: {
      fat: 0,
      protein: 0,
      carbs: 0,
      calories: 0,
    },
    baseNutritionValues: {
      fat: 0,
      protein: 0,
      carbs: 0,
      calories: 0,
    },
    allergens: undefined,
    hint: "",
  };

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div className="grid gap-2">
          {(steps && steps.length > 0) ||
          (ingredients && ingredients.length > 0) ? (
            <>
              {steps &&
                steps.map((_stepgroup, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 border-b border-b-gray-300 pb-2"
                  >
                    {steps.length > 1 && (
                      <CustomTextField
                        name={`steps.${i}.name`}
                        label="Name der Gruppierung"
                      />
                    )}
                    <FieldArray
                      name={`steps.${i}.steps`}
                      render={(helpers) => (
                        <div className="flex flex-col gap-2">
                          {steps[i].steps && steps[i].steps.length > 0 ? (
                            <>
                              {steps[i].steps.map((_step, index) => (
                                <div
                                  key={index}
                                  className="flex flex-col gap-2"
                                >
                                  <CustomTextField
                                    label={`Schritt ${index + 1}`}
                                    name={`steps.${i}.steps.${index}`}
                                  />
                                  <CustomButton
                                    label={removeSingleLabel}
                                    onClick={() => helpers.remove(index)}
                                  />
                                </div>
                              ))}
                              <CustomButton
                                label={addSingleLabel}
                                onClick={() => helpers.push("")}
                              />
                            </>
                          ) : (
                            <CustomButton
                              label={addSingleLabel}
                              onClick={() => helpers.push("")}
                            />
                          )}
                        </div>
                      )}
                    />
                    {steps.length > 1 && i !== 0 && (
                      <CustomButton
                        label="Gruppe löschen"
                        onClick={() => arrayHelpers.remove(i)}
                      />
                    )}
                  </div>
                ))}
              {ingredients &&
                ingredients.map((_ingredientgroup, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 gap-x-5 gap-y-2 border-b border-b-gray-300 pb-2"
                  >
                    {ingredients.length > 1 && (
                      <>
                        <CustomTextField
                          name={`ingredients.${i}.name`}
                          label={"Name der Gruppierung " + (i + 1)}
                        />
                        <hr className="border-gray-300 col-span-2 my-2" />
                      </>
                    )}
                    <FieldArray
                      name={`ingredients.${i}.ingredients`}
                      render={(helpers) => (
                        <div className="col-span-2 grid gap-2">
                          {ingredients[i].ingredients &&
                            ingredients[i].ingredients.length > 0 && (
                              <>
                                {ingredients[i].ingredients.map(
                                  (_ingredient, index) => (
                                    <div
                                      key={index}
                                      className="grid grid-cols-2 gap-x-5 gap-y-2 border-b border-b-gray-300 pb-2"
                                    >
                                      <CustomTextField
                                        label="Name"
                                        name={`ingredients.${i}.ingredients.${index}.name`}
                                      />
                                      <CustomNumberField
                                        label="Menge"
                                        name={`ingredients.${i}.ingredients.${index}.amount`}
                                        min={0}
                                        className="row-start-2"
                                      />
                                      <CustomDropdownInput
                                        label="Einheit"
                                        name={`ingredients.${i}.ingredients.${index}.unit`}
                                        options={
                                          Object.keys(
                                            translatedUnits,
                                          ) as Units[]
                                        }
                                        getOptionLabel={(unit) =>
                                          translatedUnits[unit] || unit
                                        }
                                        className="row-start-2"
                                      />
                                      <NutritionValuesFields
                                        namePrefix={`ingredients.${i}.ingredients.${index}.nutritionValues`}
                                      />
                                      <CustomButton
                                        label="Werte neu berechnen"
                                        onClick={() => {
                                          recalculateNutritionValues(
                                            i,
                                            index,
                                            ingredients[i].ingredients[index]
                                              .baseNutritionValues,
                                            formikRef,
                                          );
                                        }}
                                        className="col-span-2"
                                      />
                                      <MultiChipInput
                                        label="Allergene"
                                        options={
                                          allAllergens?.map(
                                            (a) => a.allergen,
                                          ) || []
                                        }
                                        name={`ingredients.${i}.ingredients.${index}.allergens`}
                                      />
                                      <CustomTextField
                                        label="Hinweis"
                                        name={`ingredients.${i}.ingredients.${index}.hint`}
                                        className="self-end"
                                      />
                                      <CustomButton
                                        label={removeSingleLabel}
                                        onClick={() => helpers.remove(index)}
                                        className="col-span-2 justify-self-end"
                                      />
                                    </div>
                                  ),
                                )}
                              </>
                            )}
                          <CustomButton
                            label={addSingleLabel}
                            onClick={() => helpers.push(emptyIngredient)}
                          />
                          <FindAndAddIngredients
                            arrayHelpers={helpers}
                            onOpenFatsecretDialog={() =>
                              setShowFatsecretDialog &&
                              setShowFatsecretDialog(true)
                            }
                          />
                        </div>
                      )}
                    />
                    {ingredients.length > 1 && (
                      <CustomButton
                        label="Gruppe löschen"
                        onClick={() => arrayHelpers.remove(i)}
                        className="col-span-2 justify-self-end"
                      />
                    )}
                  </div>
                ))}
              <CustomButton
                label={addGroupLabel}
                onClick={() =>
                  arrayHelpers.push(
                    steps
                      ? {
                          name: "",
                          steps: [],
                        }
                      : { name: "", ingredients: [] },
                  )
                }
              />
            </>
          ) : (
            <CustomButton
              label={addGroupLabel}
              onClick={() =>
                arrayHelpers.push(
                  steps
                    ? {
                        name: "",
                        steps: [],
                      }
                    : { name: "", ingredients: [] },
                )
              }
            />
          )}
        </div>
      )}
    />
  );
}
