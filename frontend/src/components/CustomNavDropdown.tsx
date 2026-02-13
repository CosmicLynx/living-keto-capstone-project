import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext.ts";
import { useClickOutside } from "../helpers/useClickOutside.ts";
import { CustomButton } from "./CustomButton.tsx";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function CustomNavDropdown(props: {
  label: string;
  options: {
    label: string;
    navigateTo: string;
    admin?: boolean;
    customNav?: () => void;
  }[];
}) {
  const { label, options } = props;
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const filterOptions = options.filter(
    (opt) => !(opt.admin && user?.role !== "ROLE_ADMIN"),
  );
  const ref = useClickOutside(() => setOpen(false));
  const navigate = useNavigate();

  return (
    <div ref={ref}>
      <CustomButton
        label={label}
        onClick={() => setOpen(!open)}
        afterIcon={
          open ? (
            <MdArrowDropUp className="text-2xl" />
          ) : (
            <MdArrowDropDown className="text-2xl" />
          )
        }
        variant="secondary"
      />
      {open && (
        <div className="relative">
          <div className="mt-1 w-full grid bg-white rounded shadow-lg absolute z-1400 font-medium text-primary overflow-hidden">
            {filterOptions.map((option) => (
              <button
                key={`${option.label}`}
                type="button"
                onClick={() =>
                  option.customNav
                    ? option.customNav()
                    : navigate(option.navigateTo)
                }
                className="hover:cursor-pointer px-3 py-1 min-h-10 text-left w-full hover:bg-gray-200 flex items-center transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
