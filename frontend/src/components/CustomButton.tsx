export function CustomButton(props: { label: string; onClick?: () => void }) {
  const { label, onClick } = props;

  return (
    <button
      onClick={onClick}
      className="border rounded-[3px] px-4 py-2 hover:cursor-pointer w-fit"
    >
      {label}
    </button>
  );
}
