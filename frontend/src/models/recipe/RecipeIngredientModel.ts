import type { NutritionValuesModel } from "./NutritionValuesModel.ts";
import type { Units } from "./Units.ts";

export type RecipeIngredientModel = {
  id: string;
  name: string;
  amount: number;
  unit: Units;
  nutritionValues: NutritionValuesModel;
  allergens: string[] | undefined;
  hint?: string | null;
};
