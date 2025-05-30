import type { RecipeIngredientModel } from "./RecipeIngredientModel.ts";

export type IngredientGroupModel = {
  name: string;
  ingredients: RecipeIngredientModel[];
};
