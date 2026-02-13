import type { FatsecretServingsModel } from "./FatsecretServingsModel.ts";

export type FatsecretIngredientDetailModel = {
  food_id: string;
  food_name: string;
  servings: FatsecretServingsModel;
};
