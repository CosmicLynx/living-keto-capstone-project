import type { NutritionValuesPerUnitModel } from "./NutritionValuesPerUnitModel.ts";

export type IngredientModel = {
  id: string;
  name: string;
  nutritionValuesPerUnit: NutritionValuesPerUnitModel[];
  allergens: string[] | null;
};
