import { type ReactNode, useContext, useState } from "react";
import { PageWrapper } from "../layout/PageWrapper.tsx";
import type { CalculatorResponseModel } from "../models/calculator/CalculatorResponseModel.ts";
import { CalculateCalorieNeedsDialog } from "../components/dialogs/CalculateCalorieNeedsDialog.tsx";
import { CustomButton } from "../components/CustomButton.tsx";
import { UserContext } from "../contexts/UserContext.ts";

export function HomePage() {
  const { user } = useContext(UserContext);
  const [calculatedValues, setCalculatedValues] =
    useState<CalculatorResponseModel | null>(() => {
      const retrievedValues = localStorage.getItem("calculatedValues");
      const calculatedValues: CalculatorResponseModel | null = retrievedValues
        ? JSON.parse(retrievedValues)
        : null;
      return calculatedValues;
    });

  const [open, setOpen] = useState(false);

  return (
    <PageWrapper>
      <div className="mb-4">
        <h1 className="text-primary mb-2">
          Willkommen bei Living Keto{user && ", " + user.username}!
        </h1>
        <p className="italic">
          Dieses Projekt realisiert eine kompakte Datenbank von ketogenen
          Rezepten aus dem Blog "Living Keto" von Karen Wiltner.
        </p>
        <hr className="mt-4 border-primary-background" />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-primary">Keto-Kalorienrechner</h2>
        <CustomButton
          variant="primary"
          label="Kalorienbedarf berechnen"
          onClick={() => setOpen(true)}
        />
      </div>
      {calculatedValues ? (
        <div className="grid gap-4">
          <ResultGroup
            title="Dein aktueller Energiebedarf"
            descriptionTitle="Deine aktuellen Werte"
            description="Nachfolgend findest du deinen Grundumsatz, Leistungsumsatz und
                Gesamtumsatz. Diese Werte zeigen deinen aktuellen Energiebedarf
                und bilden die Grundlage für die Berechnung deiner individuellen
                Makronährstoffziele."
          >
            <p className="font-medium">Grundumsatz:</p>
            <p>{calculatedValues.baseMetabolicRate}</p>
            <p className="text-s italic col-start-2">
              Diesen Energiebedarf hat Dein Körper im Ruhezustand.
            </p>
            <p className="font-medium">Leistungsumsatz:</p>
            <p>{calculatedValues.metabolicTurnover}</p>
            <p className="text-s italic col-start-2">
              Diese Energie benötigt Dein Körper für Deine angegebenen
              Aktivitäten.
            </p>
            <p className="font-medium">Gesamtumsatz:</p>
            <p>{calculatedValues.totalMetabolicRate}</p>
            <p className="text-s italic col-start-2">
              Verwende diesen Kalorienbedarf, wenn Du Dein Gewicht halten oder
              langsam Gewicht verlieren möchtest.
            </p>
          </ResultGroup>
          <ResultGroup
            title="Deine Berechnung für dein gewähltes Ziel"
            descriptionTitle="Deine Zielwerte"
            description="Hier siehst du deine individuell berechnete Kalorienmenge sowie
                die optimale Verteilung von Kohlenhydraten, Eiweiß und Fett für
                dein gewähltes Ziel. Diese Werte helfen dir, deine Mahlzeiten
                gezielt zu planen und können in deiner Tracking-App hinterlegt
                werden, um deine Ernährung optimal an deine Bedürfnisse
                anzupassen."
          >
            <p className="font-medium">
              Berechnete Kalorienmenge für dein gewähltes Ziel:
            </p>
            <p>{calculatedValues.goalCalories}</p>
            <p className="font-medium">KH (g):</p>
            <p>{calculatedValues.carbGoal}</p>
            <p className="font-medium">EW (g):</p>
            <p>{calculatedValues.proteinGoal}</p>
            <p className="font-medium">Fett (g):</p>
            <p>{calculatedValues.fatGoal}</p>
          </ResultGroup>
        </div>
      ) : (
        <div>
          Um Deinen Kalorienbedarf anzuzeigen, berechne ihn bitte über
          "Kalorienbedarf berechnen".
          <br />
          Deine angegebenen Daten werden nicht gespeichert.
        </div>
      )}
      <CalculateCalorieNeedsDialog
        calculate={setCalculatedValues}
        open={open}
        onClose={() => setOpen(false)}
      />
    </PageWrapper>
  );
}

function ResultGroup(props: {
  title: string;
  descriptionTitle: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-2">{props.title}</h3>
      <div className="mb-1">
        <h4>{props.descriptionTitle}</h4>
        <p>{props.description}</p>
      </div>
      <div className="grid grid-cols-[1fr_4fr] gap-y-1 gap-x-2">
        {props.children}
      </div>
    </div>
  );
}
