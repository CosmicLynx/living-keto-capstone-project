import type { IngredientGroupModel } from "./IngredientGroupModel.ts";
import type { NutritionValuesModel } from "./NutritionValuesModel.ts";

export type RecipeModel = {
  id: string;
  title: string;
  ingredients: IngredientGroupModel[];
  nutritionValues: NutritionValuesModel;
  totalTime: number;
  allergens: string[] | null;
  tags: string[];
  image: string;
};
