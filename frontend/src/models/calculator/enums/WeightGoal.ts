export type WeightGoal = "LOSE_WEIGHT" | "KEEP_WEIGHT" | "GAIN_MUSCLE";

export const translatedWeightGoal: { [key in WeightGoal]: string } = {
  LOSE_WEIGHT: "Abnehmen",
  KEEP_WEIGHT: "Gewicht halten",
  GAIN_MUSCLE: "Muskelaufbau",
};
