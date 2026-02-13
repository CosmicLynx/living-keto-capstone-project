import { CustomNumberField } from "../../form/CustomNumberField.tsx";

export function NutritionValuesFields(props: { namePrefix: string }) {
  const { namePrefix } = props;
  return (
    <div className="col-span-2 grid grid-cols-4 gap-5">
      <CustomNumberField name={`${namePrefix}.carbs`} label="KH (g)" min={0} />
      <CustomNumberField
        name={`${namePrefix}.protein`}
        label="Eiweiß (g)"
        min={0}
      />
      <CustomNumberField name={`${namePrefix}.fat`} label="Fett (g)" min={0} />
      <CustomNumberField
        name={`${namePrefix}.calories`}
        label="Kalorien (kcal)"
        min={0}
      />
    </div>
  );
}
