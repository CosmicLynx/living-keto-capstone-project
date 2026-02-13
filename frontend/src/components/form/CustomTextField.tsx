import { Field } from "@base-ui-components/react";
import { useField, useFormikContext } from "formik";
import { CustomFormComponentWrapper } from "./CustomFormComponentWrapper.tsx";

export function CustomTextField(props: {
  name: string;
  label?: string;
  placeholder?: string;
  setValue?: (value: string | number | readonly string[] | undefined) => void;
  hint?: string;
  className?: string;
}) {
  const { name, label, placeholder, setValue, hint, className } = props;
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
      <Field.Control
        value={field.value ?? ""}
        onValueChange={(val) => {
          setFieldValue(name, val);
          if (setValue) setValue(val);
        }}
        id={name}
        placeholder={placeholder || label}
        className={
          "border w-full border-gray-400 rounded px-3 py-1 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        }
      />
    </CustomFormComponentWrapper>
  );
}
