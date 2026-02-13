import type { Sex } from "./enums/Sex.ts";
import type { ActivityLevel } from "./enums/ActivityLevel.ts";
import type { IsPregnant } from "./enums/IsPregnant.ts";
import type { IsBreastfeeding } from "./enums/IsBreastfeeding.ts";
import type { WeightGoal } from "./enums/WeightGoal.ts";

export type CalculatorRequestModel = {
  sex: Sex;
  age: number | null;
  weight: number | null;
  height: number | null;
  activityLevel: ActivityLevel;
  dailySport: boolean;
  isPregnant: IsPregnant;
  isBreastfeeding: IsBreastfeeding;
  weightGoal: WeightGoal;
  carbGoal: number;
  proteinGoalFactor: number;
};
