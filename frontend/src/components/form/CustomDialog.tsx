import { type ReactNode } from "react";
import { CustomButton } from "../CustomButton.tsx";
import { MdClose } from "react-icons/md";

export function CustomDialog(props: {
  open: boolean;
  title: string;
  size?: "small" | "regular";
  saveLabel?: string;
  closeLabel?: string;
  children: ReactNode;
  canSave?: boolean;
  isSubmitting?: boolean;
  hasSave?: boolean;
  onClose: () => void;
}) {
  const {
    children,
    onClose,
    title,
    canSave,
    hasSave,
    saveLabel = "Speichern",
    closeLabel = "Abbrechen",
    isSubmitting,
    open,
    size = "regular",
  } = props;

  const sizeClass =
    size === "small" ? "w-full max-w-[600px]" : "w-full max-w-[800px]";

  return (
    <>
      {open && (
        <div>
          <div className="fixed inset-0 bg-black/25 backdrop-blur-xs transition-all duration-150" />
          <div
            className={
              sizeClass +
              " fixed top-1/2 left-1/2 max-h-[750px] w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[8px]"
            }
          >
            <div className="flex justify-between items-center border-b border-gray-200 py-4 px-6 bg-white">
              <h3 className="text-primary">{title}</h3>
              <div className="flex gap-1">
                {hasSave && (
                  <CustomButton
                    label={isSubmitting ? "Speichert..." : saveLabel}
                    variant="primary"
                    type="submit"
                    disabled={!canSave}
                  />
                )}
                <CustomButton
                  label={closeLabel}
                  onClick={onClose}
                  afterIcon={<MdClose className="text-l" />}
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-[600px] p-5 bg-white">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
