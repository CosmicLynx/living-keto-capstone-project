import type { IngredientGroupModel } from "./IngredientGroupModel.ts";
import type { StepGroupModel } from "./StepGroupModel.ts";
import type { NutritionValuesModel } from "./NutritionValuesModel.ts";

export type RecipeDetailModelDto = {
  title: string;
  ingredients: IngredientGroupModel[];
  steps: StepGroupModel[];
  nutritionValues: NutritionValuesModel;
  preparationTime: number;
  cookingTime: number;
  defaultPortions: number;
  tags: string[];
  image: string;
};
