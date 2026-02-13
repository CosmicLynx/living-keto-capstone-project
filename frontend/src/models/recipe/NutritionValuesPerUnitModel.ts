import type { NutritionValuesModel } from "./NutritionValuesModel.ts";
import type { Units } from "./Units.ts";

export type NutritionValuesPerUnitModel = {
  defaultAmount: number;
  unit: Units;
  nutritionValues: NutritionValuesModel;
};
