interface SaveButtonProps {
  label: string;
  onClick?: () => void;
}

export function SaveButton({ label, onClick }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ width: "373px", height: "50px" }}
      className="bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition"
    >
      {label}
    </button>
  );
}
