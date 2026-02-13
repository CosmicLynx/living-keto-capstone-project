import type { CalculatorRequestModel } from "../../models/calculator/CalculatorRequestModel";
import type { CalculatorResponseModel } from "../../models/calculator/CalculatorResponseModel";
import { useEffect, useRef } from "react";
import { Form, Formik, type FormikProps } from "formik";
import { CustomFieldGroup } from "../form/CustomFieldGroup.tsx";
import { CustomRadioGroup } from "../form/CustomRadioGroup.tsx";
import { type Sex, translatedSex } from "../../models/calculator/enums/Sex.ts";
import { CustomNumberField } from "../form/CustomNumberField.tsx";
import { CustomDropdownInput } from "../form/CustomDropdownInput.tsx";
import {
  type ActivityLevel,
  translatedActivityLevel,
} from "../../models/calculator/enums/ActivityLevel.ts";
import {
  type IsPregnant,
  translatedIsPregnant,
} from "../../models/calculator/enums/IsPregnant.ts";
import {
  type IsBreastfeeding,
  translatedIsBreastfeeding,
} from "../../models/calculator/enums/IsBreastfeeding.ts";
import {
  translatedWeightGoal,
  type WeightGoal,
} from "../../models/calculator/enums/WeightGoal.ts";
import { CustomDialog } from "../form/CustomDialog.tsx";
import * as Yup from "yup";
import axios from "axios";

export function CalculateCalorieNeedsDialog(props: {
  calculate: (values: CalculatorResponseModel) => void;
  open: boolean;
  onClose: () => void;
}) {
  const { onClose, open, calculate } = props;
  const initialValues: CalculatorRequestModel = {
    sex: "FEMALE",
    age: 0,
    weight: 0,
    height: 0,
    activityLevel: "SITTING_STANDING_WALKING",
    dailySport: false,
    isPregnant: "NO",
    isBreastfeeding: "NO",
    weightGoal: "KEEP_WEIGHT",
    carbGoal: 20,
    proteinGoalFactor: 1.2,
  };

  const validationSchema = Yup.object().shape({
    age: Yup.number().required(),
    weight: Yup.number().required(),
    height: Yup.number().required(),
  });

  const formikRef = useRef<FormikProps<CalculatorRequestModel>>(null);
  useEffect(() => {
    const weightGoal = formikRef.current?.values.weightGoal;
    switch (weightGoal) {
      case "KEEP_WEIGHT":
        formikRef.current?.setFieldValue("proteinGoalFactor", 1.2);
        break;
      case "LOSE_WEIGHT":
        formikRef.current?.setFieldValue("proteinGoalFactor", 1.5);
        break;
      case "GAIN_MUSCLE":
        formikRef.current?.setFieldValue("proteinGoalFactor", 2);
        break;
    }
  }, [formikRef.current?.values.weightGoal]);

  const handleSubmit = (values: CalculatorRequestModel) => {
    axios
      .post("/api/calculator", values)
      .then((response) => {
        localStorage.setItem("calculatedValues", JSON.stringify(response.data));
        calculate(response.data);
        onClose();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        innerRef={formikRef}
      >
        {({ values, isValid }) => (
          <Form>
            <CustomDialog
              open={open}
              title="Keto-Kalorienrechner"
              onClose={onClose}
              hasSave
              canSave={isValid}
            >
              <div className="grid gap-5">
                <CustomFieldGroup
                  groupLabel="Deine Daten"
                  className="grid grid-cols-2 gap-x-5"
                >
                  <CustomRadioGroup
                    name="sex"
                    label="Geschlecht"
                    options={Object.keys(translatedSex) as Sex[]}
                    getOptionLabel={(sex) => translatedSex[sex] || sex}
                    className="col-span-2"
                  />
                  <CustomNumberField
                    name="age"
                    label="Alter in Jahren"
                    min={3}
                    max={120}
                  />
                  <CustomNumberField
                    name="weight"
                    label="Gewicht in kg"
                    min={1}
                    className="row-start-4"
                  />
                  <CustomNumberField
                    name="height"
                    label="Größe in cm"
                    min={100}
                    max={230}
                    className="row-start-5"
                  />
                  <CustomDropdownInput
                    label="Deine tägliche Aktivität"
                    name="activityLevel"
                    options={
                      Object.keys(translatedActivityLevel) as ActivityLevel[]
                    }
                    getOptionLabel={(activityLevel) =>
                      translatedActivityLevel[activityLevel] || activityLevel
                    }
                    className="col-span-2"
                  />
                  <CustomRadioGroup
                    name="dailySport"
                    label="Treibst Du täglich Sport?"
                    options={[true, false]}
                    hint="Bitte nur auswählen, wenn wirklich TÄGLICH mind. 2h Sport getrieben wird!"
                    getOptionLabel={(option) => (option ? "Ja" : "Nein")}
                    className="col-span-2"
                  />
                </CustomFieldGroup>
                {values.sex === "FEMALE" && (
                  <CustomFieldGroup
                    groupLabel="zusätzliche Informationen"
                    className="grid grid-cols-2 gap-x-5"
                  >
                    <CustomDropdownInput
                      label="Bist Du schwanger?"
                      name="isPregnant"
                      options={
                        Object.keys(translatedIsPregnant) as IsPregnant[]
                      }
                      getOptionLabel={(isPregnant) =>
                        translatedIsPregnant[isPregnant] || isPregnant
                      }
                    />
                    <CustomDropdownInput
                      label="Stillst Du?"
                      name="isBreastfeeding"
                      options={
                        Object.keys(
                          translatedIsBreastfeeding,
                        ) as IsBreastfeeding[]
                      }
                      getOptionLabel={(isBreastfeeding) =>
                        translatedIsBreastfeeding[isBreastfeeding] ||
                        isBreastfeeding
                      }
                    />
                  </CustomFieldGroup>
                )}
                <CustomFieldGroup groupLabel="Was ist dein Ziel?">
                  <CustomRadioGroup
                    name="weightGoal"
                    label="Worauf willst Du Dich mit der ketogenen Ernährung fokussieren?"
                    options={Object.keys(translatedWeightGoal) as WeightGoal[]}
                    getOptionLabel={(weightGoal) =>
                      translatedWeightGoal[weightGoal] || weightGoal
                    }
                    hint="Deine Auswahl ist die Basis für weitere Berechnungen wie Gesamtkalorien und Eiweißmenge."
                  />
                </CustomFieldGroup>
                <CustomFieldGroup
                  groupLabel="Deine Makro-Einstellungen"
                  className="grid grid-cols-2 gap-x-5"
                >
                  <CustomNumberField
                    name="carbGoal"
                    label="Kohlenhydrate (KH) in Gramm"
                    min={0}
                    hint="Passe die Menge an kh an deine Wünsche an."
                  />
                  <CustomNumberField
                    name="proteinGoalFactor"
                    label="Berechnung Eiweißfaktor"
                    step={0.1}
                    min={1}
                    hint="Du bist dir nicht sicher? Dann lass den Wert so, wie er ist."
                  />
                </CustomFieldGroup>
              </div>
            </CustomDialog>
          </Form>
        )}
      </Formik>
    </>
  );
}
