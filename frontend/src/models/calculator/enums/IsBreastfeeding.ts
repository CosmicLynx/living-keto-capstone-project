export type IsBreastfeeding =
  | "NO"
  | "FIRST_FOUR_MONTHS"
  | "FULLY_AFTER_FOUR_MONTHS"
  | "PARTLY_AFTER_FOUR_MONTHS";

export const translatedIsBreastfeeding: { [key in IsBreastfeeding]: string } = {
  NO: "Nein",
  FIRST_FOUR_MONTHS: "Stillend in den ersten 4 Monaten",
  FULLY_AFTER_FOUR_MONTHS: "Voll-Stillend nach 4 Monaten",
  PARTLY_AFTER_FOUR_MONTHS: "Teil-Stillend nach 4 Monaten",
};
