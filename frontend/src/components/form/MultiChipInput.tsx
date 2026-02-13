import { useField, useFormikContext } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { Field } from "@base-ui-components/react";
import { CustomDropdownInput } from "./CustomDropdownInput.tsx";
import { Chip } from "../Chip.tsx";

export function MultiChipInput(props: {
  name: string;
  label: string;
  options: string[];
  hint?: string;
  placeholder?: string;
  className?: string;
}) {
  const { name, label, options, hint, placeholder, className } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField<string[]>(name);
  const error = meta.touched && meta.error;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return options.filter(
      (opt) =>
        !field.value?.includes(opt) && opt.toLowerCase().includes(lowerSearch),
    );
  }, [options, field.value, search]);

  const addValue = (val: string) => {
    if (!val) return;
    if (!field.value?.includes(val)) {
      setFieldValue(name, [...(field.value || []), val]);
    }
    setSearch("");
  };

  const removeValue = (val: string) => {
    setFieldValue(
      name,
      (field.value || []).filter((v) => v !== val),
    );
  };
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div className={className}>
      {field.value && field.value.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {field.value?.map((val) => (
            <Chip key={val} value={val} removeValue={removeValue} />
          ))}
        </div>
      )}
      <CustomDropdownInput
        label={label}
        name={name}
        options={filteredOptions}
        getOptionLabel={(o) => o}
        hint={hint}
        open={open}
        setOpen={setOpen}
        customError={error ? meta.error : undefined}
        customInput={
          <Field.Control
            id={name}
            value={search}
            placeholder={placeholder || label}
            onValueChange={(val) => setSearch(val as string)}
            onFocus={() => setOpen(true)}
            className={
              "border flex justify-between items-center border-gray-400 rounded px-3 py-1 h-10 w-full"
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (search.trim()) addValue(search.trim());
                setOpen(false);
              }
            }}
          />
        }
        customSelectFunction={addValue}
      />
    </div>
  );
}
