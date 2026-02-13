export type ActivityLevel =
  | "BEDRIDDEN"
  | "SITTING_OR_LYING_DOWN"
  | "SITTING_MINIMAL_ACTIVITY"
  | "SITTING_STANDING_WALKING"
  | "STANDING_WALKING"
  | "MANUAL_LABOR";

export const translatedActivityLevel: { [key in ActivityLevel]: string } = {
  BEDRIDDEN: "bettlägerig",
  SITTING_OR_LYING_DOWN: "nur sitzend oder liegend",
  SITTING_MINIMAL_ACTIVITY:
    "sitzend, kaum körperliche Aktivität (Büroarbeit am Schreibtisch)",
  SITTING_STANDING_WALKING:
    "sitzend, gehend und stehend (Studenten, Schüler, Taxifahrer)",
  STANDING_WALKING:
    "hauptsächlich stehend und gehend (Verkäufer, Kellner, Handwerker)",
  MANUAL_LABOR:
    "körperlich anstrengende berufliche Arbeit (Maurer, Dachdecker)",
};
