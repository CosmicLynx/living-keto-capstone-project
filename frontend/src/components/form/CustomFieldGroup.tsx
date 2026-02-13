import type { ReactNode } from "react";
import { Fieldset } from "@base-ui-components/react";

export function CustomFieldGroup(props: {
  groupLabel: string;
  children: ReactNode;
  className?: string;
}) {
  const { groupLabel, children, className } = props;
  return (
    <Fieldset.Root className={"flex flex-col gap-2 " + className}>
      <Fieldset.Legend className="col-span-full">
        <h3>{groupLabel}</h3>
      </Fieldset.Legend>
      {children}
    </Fieldset.Root>
  );
}
