import { useState } from "react";

interface SaveButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "solid" | "outline-red" | "outline-purple" | "solid-red";
}

export function SaveButton({
  label,
  onClick,
  variant = "solid",
}: SaveButtonProps) {
  const [hovered, setHovered] = useState(false);

  const styles: Record<string, React.CSSProperties> = {
    solid: { backgroundColor: "#9333ea", color: "white" },
    "solid-red": { backgroundColor: "#ef4444", color: "white" },
    "outline-red": {
      border: "1px solid #f87171",
      color: hovered ? "white" : "#f87171",
      backgroundColor: hovered ? "#ef4444" : "transparent",
    },
    "outline-purple": {
      border: "1px solid #a855f7",
      color: "#a855f7",
      backgroundColor: "transparent",
    },
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "373px",
        height: "50px",
        borderRadius: "999px",
        fontWeight: 500,
        fontSize: "0.875rem",
        cursor: "pointer",
        transition: "all 0.2s",
        ...styles[variant],
      }}
    >
      {label}
    </button>
  );
}
