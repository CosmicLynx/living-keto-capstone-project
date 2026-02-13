import type { ChangeEvent, DragEvent } from "react";
import { useCallback } from "react";
import { useField, useFormikContext } from "formik";
import { CustomFormComponentWrapper } from "./CustomFormComponentWrapper.tsx";

export function DragAndDropInput(props: { name: string; className?: string }) {
  const { name, className } = props;
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const error = meta.touched && meta.error;

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue(name, reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [name, setFieldValue],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <CustomFormComponentWrapper
      label="Bild"
      error={error ? meta.error : undefined}
      className={className}
    >
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={
          "border border-dashed border-gray-400 rounded p-6 text-center cursor-pointer hover:border-primary transition-all"
        }
        onClick={() => document.getElementById(`file-input-${name}`)?.click()}
      >
        {field.value ? (
          <img
            src={field.value}
            alt="Preview"
            className="mx-auto max-h-60 object-contain rounded"
          />
        ) : (
          <p className="italic">
            Ziehe oder klicke hier, um ein Bild hochzuladen.
          </p>
        )}
        <input
          id={`file-input-${name}`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </CustomFormComponentWrapper>
  );
}
