import { useField, useFormikContext } from "formik";
import { CustomFormComponentWrapper } from "./CustomFormComponentWrapper.tsx";
import { type ReactNode, useState } from "react";
import { useClickOutside } from "../../helpers/useClickOutside.ts";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { CustomButton } from "../CustomButton.tsx";

export function CustomDropdownInput<T extends string>(props: {
  label: string;
  name: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  hint?: string;
  customInput?: ReactNode;
  customSelectFunction?: (val: T) => void;
  customError?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  className?: string;
}) {
  const {
    name,
    label,
    options,
    getOptionLabel,
    hint,
    customError,
    customInput,
    customSelectFunction,
    open,
    setOpen,
    className,
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const error = customError ? customError : meta.touched && meta.error;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => {
    if (setOpen) {
      setOpen(false);
    } else setIsOpen(false);
  });

  return (
    <CustomFormComponentWrapper
      label={label}
      error={error ? meta.error : undefined}
      hint={hint}
      ref={ref}
      className={className}
    >
      {customInput ? (
        customInput
      ) : (
        <CustomButton
          onClick={() => {
            if (setOpen) {
              setOpen(!open);
            } else setIsOpen(!isOpen);
          }}
          afterIcon={
            open || isOpen ? (
              <MdArrowDropUp className="text-2xl" />
            ) : (
              <MdArrowDropDown className="text-2xl" />
            )
          }
          label={field.value ? getOptionLabel(field.value) : label}
          variant="input"
        />
      )}

      {(open || isOpen) && options.length > 0 && (
        <div className="relative -mt-1">
          <div className="mt-1 w-full border grid border-gray-400 bg-white rounded shadow-lg absolute z-1400 overflow-hidden">
            {options.map((option) => (
              <button
                value={option}
                key={`${option}`}
                type="button"
                onClick={() => {
                  if (customSelectFunction) {
                    customSelectFunction(option);
                  } else {
                    setFieldValue(name, option);
                  }
                  if (setOpen) {
                    setOpen(false);
                  } else {
                    setIsOpen(false);
                  }
                }}
                className="px-3 py-1 min-h-10 text-left w-full hover:bg-gray-200 hover:cursor-pointer flex items-center transition-colors"
              >
                {getOptionLabel(option)}
              </button>
            ))}
          </div>
        </div>
      )}
    </CustomFormComponentWrapper>
  );
}
