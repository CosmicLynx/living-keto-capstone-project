export type IsPregnant = "YES" | "NO";

export const translatedIsPregnant: { [key in IsPregnant]: string } = {
  YES: "Ja",
  NO: "Nein",
};
