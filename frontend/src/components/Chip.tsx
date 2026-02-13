import { MdClose } from "react-icons/md";

export function Chip(props: {
  value: string;
  removeValue?: (val: string) => void;
  variant?: "primary" | "warning";
}) {
  const { value, removeValue, variant = "primary" } = props;
  return (
    <div
      className={
        (variant === "primary"
          ? "bg-secondary-light text-primary"
          : "bg-warning-light text-warning-dark") +
        " flex items-center w-fit h-fit px-2 rounded-full text-s font-semibold"
      }
    >
      <span>{value}</span>
      {!!removeValue && (
        <button
          type="button"
          className={
            (variant === "primary"
              ? "text-primary-dark"
              : "text-warning-dark") + " ml-1"
          }
          onClick={() => {
            removeValue(value);
          }}
          aria-label={`${value} entfernen`}
        >
          <MdClose />
        </button>
      )}
    </div>
  );
}
