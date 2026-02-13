export type Sex = "MALE" | "FEMALE";

export const translatedSex: { [key in Sex]: string } = {
  MALE: "männlich",
  FEMALE: "weiblich",
};
