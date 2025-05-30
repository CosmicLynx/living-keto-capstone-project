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
  PIECE: "",
  GRAM: "g",
  KILOGRAM: "kg",
  TEASPOON: "TL",
  TABLESPOON: "EL",
  NONE: "",
  SOME: "etwas",
  PINCH: "Prise",
  PACK: "Päckchen",
  LITER: "l",
  MILLILITER: "ml",
};
