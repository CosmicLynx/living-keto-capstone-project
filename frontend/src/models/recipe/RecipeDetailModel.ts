import type { IngredientGroupModel } from "./IngredientGroupModel.ts";
import type { NutritionValuesModel } from "./NutritionValuesModel.ts";
import type { StepGroupModel } from "./StepGroupModel.ts";

export type RecipeDetailModel = {
  id: string;
  title: string;
  ingredients: IngredientGroupModel[];
  steps: StepGroupModel[];
  nutritionValues: NutritionValuesModel;
  createdAt: string;
  updatedAt: string;
  preparationTime: number;
  cookingTime: number;
  totalTime: number;
  defaultPortions: number;
  allergens: string[] | null;
  tags: string[];
  image: string;
};
