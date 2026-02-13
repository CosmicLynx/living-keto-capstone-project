import type { FormikErrors, FormikProps, FormikValues } from "formik";
import type { IngredientGroupModel } from "../../../models/recipe/IngredientGroupModel.ts";
import type { NutritionValuesModel } from "../../../models/recipe/NutritionValuesModel.ts";
import type { RecipeFormValues } from "./NewRecipeDialog.tsx";

export const formatNumberInput = (
  value: number | string | null | undefined,
  asInteger?: boolean,
): string => {
  const num = typeof value === "number" ? value : parseFloat(value as string);
  if (isNaN(num)) return "0.00";
  if (asInteger) return Math.round(num).toString();
  return parseFloat(num.toFixed(2)).toString();
};

export const calculateTotal = (
  values: FormikValues,
  setFieldValue: (
    field: string,
    value: string,
  ) => Promise<void | FormikErrors<FormikValues>>,
) => {
  let totalFat = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalCalories = 0;

  values.ingredients.forEach((group: IngredientGroupModel) => {
    group.ingredients.forEach((ingredient) => {
      totalFat += parseFloat(ingredient.nutritionValues.fat.toString()) || 0;
      totalProtein +=
        parseFloat(ingredient.nutritionValues.protein.toString()) || 0;
      totalCarbs +=
        parseFloat(ingredient.nutritionValues.carbs.toString()) || 0;
      totalCalories +=
        parseFloat(ingredient.nutritionValues.calories.toString()) || 0;
    });
  });

  const skaldeman = totalFat / (totalProtein + totalCarbs);

  setFieldValue("nutritionValues.fat", formatNumberInput(totalFat));
  setFieldValue("nutritionValues.protein", formatNumberInput(totalProtein));
  setFieldValue("nutritionValues.carbs", formatNumberInput(totalCarbs));
  setFieldValue(
    "nutritionValues.calories",
    formatNumberInput(totalCalories, true),
  );
  setFieldValue("nutritionValues.skaldeman", formatNumberInput(skaldeman));
};

export const recalculateNutritionValues = (
  groupIndex: number,
  ingredientIndex: number,
  baseNutritionValues: NutritionValuesModel,
  formikRef: React.RefObject<FormikProps<RecipeFormValues> | null>,
) => {
  const fieldNamePrefix = `ingredients.${groupIndex}.ingredients.${ingredientIndex}.nutritionValues`;
  const values =
    formikRef.current?.values.ingredients[groupIndex].ingredients[
      ingredientIndex
    ];

  if (!values) return;

  const amount = values.amount;
  const nutrition = baseNutritionValues;

  const multiplier = ["GRAM", "MILLILITER"].includes(values.unit)
    ? amount / 100
    : amount;

  formikRef.current?.setFieldValue(
    `${fieldNamePrefix}.fat`,
    formatNumberInput(nutrition.fat * multiplier),
  );
  formikRef.current?.setFieldValue(
    `${fieldNamePrefix}.protein`,
    formatNumberInput(nutrition.protein * multiplier),
  );
  formikRef.current?.setFieldValue(
    `${fieldNamePrefix}.carbs`,
    formatNumberInput(nutrition.carbs * multiplier),
  );
  formikRef.current?.setFieldValue(
    `${fieldNamePrefix}.calories`,
    formatNumberInput(nutrition.calories * multiplier),
  );
};
