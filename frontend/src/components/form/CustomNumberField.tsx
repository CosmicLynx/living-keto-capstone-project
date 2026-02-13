import { NumberField } from "@base-ui-components/react/number-field";
import { useField, useFormikContext } from "formik";
import { CustomFormComponentWrapper } from "./CustomFormComponentWrapper.tsx";

export function CustomNumberField(props: {
  name: string;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
  placeholder?: string;
  className?: string;
}) {
  const { name, label, min, max, step, placeholder, hint, className } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const error = meta.touched && meta.error;

  return (
    <CustomFormComponentWrapper
      label={label}
      hint={hint}
      error={error ? meta.error : undefined}
      className={className}
    >
      <NumberField.Root
        value={field.value ?? ""}
        onValueChange={(val) => setFieldValue(name, val)}
        min={min}
        max={max}
        step={step}
      >
        <NumberField.Input
          id={name}
          placeholder={placeholder}
          className="border border-gray-400 rounded px-3 py-1 h-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </NumberField.Root>
    </CustomFormComponentWrapper>
  );
}
