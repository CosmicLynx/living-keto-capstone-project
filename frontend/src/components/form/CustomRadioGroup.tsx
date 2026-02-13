import { Radio, RadioGroup } from "@base-ui-components/react";
import { useField, useFormikContext } from "formik";
import { CustomFormComponentWrapper } from "./CustomFormComponentWrapper.tsx";

export function CustomRadioGroup<T extends string | boolean>(props: {
  name: string;
  label: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  hint?: string;
  className?: string;
}) {
  const { name, label, options, getOptionLabel, hint, className } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const error = meta.touched && meta.error;
  return (
    <CustomFormComponentWrapper
      hint={hint}
      label={label}
      error={error ? meta.error : undefined}
      className={className}
    >
      <RadioGroup
        name={name}
        value={field.value}
        onValueChange={(val) => setFieldValue(name, val)}
        className={"flex flex-col items-start gap-1"}
      >
        {options.map((option) => (
          <label key={`${option}`} className="flex gap-2">
            <Radio.Root
              value={option}
              className="box-border flex w-5 h-5 items-center justify-center rounded-full border"
            >
              <Radio.Indicator className="flex items-center justify-center before:bg-black before:rounded-full before:w-2 before:h-2 [&[data-unchecked]]:hidden" />
            </Radio.Root>
            <div>{getOptionLabel(option)}</div>
          </label>
        ))}
      </RadioGroup>
    </CustomFormComponentWrapper>
  );
}
