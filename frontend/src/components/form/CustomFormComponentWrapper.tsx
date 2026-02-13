import type { ReactNode, Ref } from "react";
import { Field } from "@base-ui-components/react";

export function CustomFormComponentWrapper(props: {
  label?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
  className?: string;
}) {
  const { label, hint, error, children } = props;
  return (
    <Field.Root
      ref={props.ref}
      className={"w-full flex flex-col gap-1 " + props.className}
    >
      {label && (
        <Field.Label className="text-s font-medium">{label}</Field.Label>
      )}
      {children}
      {hint && (
        <Field.Description className="text-s italic">{hint}</Field.Description>
      )}
      {error && (
        <Field.Error className="text-s text-error italic">{error}</Field.Error>
      )}
    </Field.Root>
  );
}
