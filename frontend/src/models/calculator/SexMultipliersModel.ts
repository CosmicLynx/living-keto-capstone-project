import type { Sex } from "./enums/Sex.ts";

export type SexMultipliersModel = {
  sex: Sex;
  weightMultiplier: number;
  heightMultiplier: number;
  ageMultiplier: number;
  subtract: number;
};
