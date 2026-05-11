import React from "react";
interface LinkTextProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  onclick?: () => void;
}

export const LinkText: React.FC<LinkTextProps> = ({
    className = "",
    children,
    onClick,
}) => {
  return (
    <span
      onClick={onClick}
      className={`cursor-pointer hover:underline ${className}`}
    >
      {children}
    </span>
  );
};
export default LinkText;