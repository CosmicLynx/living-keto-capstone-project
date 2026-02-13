import { PageWrapper } from "../layout/PageWrapper.tsx";
import type { EditValuesModel } from "../models/calculator/EditValuesModel.ts";
import { useEditValues } from "../hooks/useEditValues.ts";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { CustomButton } from "../components/CustomButton.tsx";
import { translatedSex } from "../models/calculator/enums/Sex.ts";
import { CustomNumberField } from "../components/form/CustomNumberField.tsx";
import { translatedActivityLevel } from "../models/calculator/enums/ActivityLevel.ts";
import type { ReactNode } from "react";
import { translatedIsPregnant } from "../models/calculator/enums/IsPregnant.ts";
import { translatedIsBreastfeeding } from "../models/calculator/enums/IsBreastfeeding.ts";
import { translatedWeightGoal } from "../models/calculator/enums/WeightGoal.ts";

export function AdminPage() {
  const { data: editValues, isLoading } = useEditValues();

  return (
    <PageWrapper>
      <h2>Admin</h2>
      {isLoading ? (
        <div>Lädt...</div>
      ) : (
        !!editValues && <EditValuesForm editValues={editValues} />
      )}
    </PageWrapper>
  );
}

function EditValuesForm(props: { editValues: EditValuesModel }) {
  const initialValues: EditValuesModel = {
    ...props.editValues,
  };
  const queryClient = useQueryClient();
  const handleSubmit = (values: EditValuesModel) => {
    axios
      .put("/api/calculator/values", values)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["getEditValues"] });
      })
      .catch((e) => console.error(e));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form>
          <CustomButton label="Speichern" type="submit" />
          <EditGroup groupLabel="Geschlecht">
            {values.sexMultipliersValues.map((s, i) => (
              <EditLabel label={translatedSex[s.sex]} key={s.sex}>
                <CustomNumberField
                  name={`sexMultipliersValues.${i}.weightMultiplier`}
                  label="Wert: Gewicht"
                  min={0}
                  step={0.1}
                />
                <CustomNumberField
                  name={`sexMultipliersValues.${i}.heightMultiplier`}
                  label="Wert: Größe"
                  min={0}
                  step={0.1}
                />
                <CustomNumberField
                  name={`sexMultipliersValues.${i}.ageMultiplier`}
                  label="Wert: Alter"
                  min={0}
                />
                <CustomNumberField
                  name={`sexMultipliersValues.${i}.subtract`}
                  label="Wert: Subtrahend"
                  min={0}
                />
              </EditLabel>
            ))}
          </EditGroup>
          <EditGroup groupLabel="Tägliche Aktivität">
            {values.activityLevelValues.map((a, i) => (
              <EditLabel
                label={translatedActivityLevel[a.activityLevel]}
                key={a.activityLevel}
              >
                <CustomNumberField
                  name={`activityLevelValues.${i}.value`}
                  label="Wert"
                  min={0}
                  step={0.1}
                />
              </EditLabel>
            ))}
          </EditGroup>
          <EditGroup groupLabel="Schwangerschaft">
            {values.pregnantValues.map((p, i) => (
              <EditLabel
                label={translatedIsPregnant[p.isPregnant]}
                key={p.isPregnant}
              >
                <CustomNumberField
                  name={`pregnantValues.${i}.value`}
                  label="Wert"
                  min={0}
                />
              </EditLabel>
            ))}
          </EditGroup>
          <EditGroup groupLabel="Stillend">
            {values.breastfeedingValues.map((b, i) => (
              <EditLabel
                label={translatedIsBreastfeeding[b.isBreastfeeding]}
                key={b.isBreastfeeding}
              >
                <CustomNumberField
                  name={`breastfeedingValues.${i}.value`}
                  label="Wert"
                  min={0}
                />
              </EditLabel>
            ))}
          </EditGroup>
          <EditGroup groupLabel="Ziel">
            {values.weightGoalValues.map((w, i) => (
              <EditLabel
                label={translatedWeightGoal[w.weightGoal]}
                key={w.weightGoal}
              >
                <CustomNumberField
                  name={`weightGoalValues.${i}.value`}
                  label="Wert"
                  min={0}
                  step={0.1}
                />
              </EditLabel>
            ))}
          </EditGroup>
        </Form>
      )}
    </Formik>
  );
}

function EditLabel(props: { label: string; children: ReactNode }) {
  return (
    <div>
      <span>{props.label}</span>
      {props.children}
    </div>
  );
}

function EditGroup(props: { groupLabel: string; children: ReactNode }) {
  return (
    <div>
      <span>{props.groupLabel}</span>
      {props.children}
    </div>
  );
}
