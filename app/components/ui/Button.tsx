import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: "primary" | "secondary";
    loading?: boolean;
}
const Button: React.FC<ButtonProps> = ({ 
    children,
    variant = 'primary',
    loading = false,
    className = "",
    ...props 
}) => {
    const base = "w-full py-3 rounded-xl font-semibold transition";

    const variants = {
    primary: "bg-[#6A38F3] text-white hover:opacity-90",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    };

    return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Carregando..." : children}
    </button>
    );
};

export default Button; 