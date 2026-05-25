interface SaveButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "solid" | "outline-red" | "outline-purple";
}

export function SaveButton({
  label,
  onClick,
  variant = "solid",
}: SaveButtonProps) {
  const styles: Record<string, string> = {
    solid: "bg-purple-600 hover:bg-purple-700 text-white",
    "outline-red":
      "border border-red-400 text-red-400 hover:bg-red-50 bg-transparent",
    "outline-purple":
      "border border-purple-500 text-purple-500 hover:bg-purple-50 bg-transparent",
  };

  return (
    <button
      onClick={onClick}
      style={{ width: "373px", height: "50px" }}
      className={`rounded-full font-medium transition text-sm ${styles[variant]}`}
    >
      {label}
    </button>
  );
}
