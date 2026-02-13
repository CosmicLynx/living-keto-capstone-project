export type Units =
  | "PIECE"
  | "GRAM"
  | "KILOGRAM"
  | "TEASPOON"
  | "TABLESPOON"
  | "NONE"
  | "SOME"
  | "PINCH"
  | "PACK"
  | "LITER"
  | "MILLILITER";

export const translatedUnits: { [key in Units]: string } = {
  PIECE: "Stück",
  GRAM: "g",
  KILOGRAM: "kg",
  TEASPOON: "TL",
  TABLESPOON: "EL",
  SOME: "etwas",
  PINCH: "Prise",
  PACK: "Päckchen",
  LITER: "l",
  MILLILITER: "ml",
  NONE: "ohne",
};
