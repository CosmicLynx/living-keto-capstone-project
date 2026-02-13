import type { ReactNode } from "react";

export function CustomButton(props: {
  label: string;
  onClick?: () => void;
  size?: "small" | "regular";
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "primary" | "secondary" | "tertiary" | "input";
  beforeIcon?: ReactNode;
  afterIcon?: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  const {
    label,
    onClick,
    type = "button",
    variant = "tertiary",
    size = "regular",
    className,
  } = props;
  let variantStyle = "";
  switch (variant) {
    case "primary":
      variantStyle =
        "bg-primary text-white border-transparent font-semibold px-4 py-2 disabled:text-disabled-light disabled:bg-disabled disabled:cursor-not-allowed";
      break;
    case "secondary":
      variantStyle =
        "bg-secondary-light text-primary-dark border-transparent font-semibold px-4 py-2 disabled:text-disabled disabled:bg-disabled-light disabled:cursor-not-allowed";
      break;
    case "tertiary":
      variantStyle =
        "bg-white text-primary border-primary font-semibold px-4 py-2 disabled:text-disabled disabled:border-disabled disabled:cursor-not-allowed";
      break;
    case "input":
      variantStyle =
        "text-left border-gray-400 px-3 py-1 min-h-10 w-full disabled:text-disabled disabled:border-disabled disabled:bg-disabled-light disabled:cursor-not-allowed";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={
        variantStyle +
        " flex justify-between items-center border rounded-[3px] hover:cursor-pointer w-fit h-fit " +
        (className ? className : "")
      }
      type={type}
      disabled={props.disabled}
    >
      {props.beforeIcon && (
        <span className={"mr-2 " + (variant !== "input" ? "-ml-1" : "")}>
          {props.beforeIcon}
        </span>
      )}
      <span className={size === "small" ? "text-s" : ""}>{label}</span>
      {props.afterIcon && (
        <span className={"ml-2 " + (variant !== "input" ? "-mr-1" : "")}>
          {props.afterIcon}
        </span>
      )}
    </button>
  );
}
