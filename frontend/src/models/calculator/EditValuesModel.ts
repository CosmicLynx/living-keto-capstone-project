import type { SexMultipliersModel } from "./SexMultipliersModel.ts";
import type { ActivityLevelModel } from "./ActivityLevelModel.ts";
import type { IsBreastfeedingModel } from "./IsBreastfeedingModel.ts";
import type { IsPregnantModel } from "./IsPregnantModel.ts";
import type { WeightGoalModel } from "./WeightGoalModel.ts";

export type EditValuesModel = {
  sexMultipliersValues: SexMultipliersModel[];
  activityLevelValues: ActivityLevelModel[];
  breastfeedingValues: IsBreastfeedingModel[];
  pregnantValues: IsPregnantModel[];
  weightGoalValues: WeightGoalModel[];
};
