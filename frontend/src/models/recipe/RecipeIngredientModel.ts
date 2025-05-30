import type { Units } from "./Units.ts";
import type { NutritionValuesModel } from "./NutritionValuesModel.ts";

export type RecipeIngredientModel = {
  id: string;
  name: string;
  amount: number;
  unit: Units;
  nutritionValues: NutritionValuesModel;
  isAllergen?: boolean;
  hint?: string | null;
};
