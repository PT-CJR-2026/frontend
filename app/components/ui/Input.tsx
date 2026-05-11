"use client";
import React, { useState } from "react";
import Image from "next/image";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hasToggle?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  type = "text",
  hasToggle = false,
  className = "",
  ...props
}) => {
  const [show, setShow] = useState(false);

  const inputType = hasToggle ? (show ? "text" : "password") : type;

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm text-gray-600">{label}</label>
      )}

      <div className="relative">
        <input
          type={inputType}
          className={`w-full px-4 py-3 text-xl rounded-full outline-none ${className}`}
          {...props}
        />

        {hasToggle && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-600"
          >
            {show ? <Image
                src="/Olho.png"
                alt="Olho"
                width={20}
                height={20}
                style={{ height: "auto" }}
            /> : <Image
                src="/Olho.png"
                alt="Olho"
                width={20}
                height={20}
                style={{ height: "auto" }}
            />
            }
          </button>
        )}
      </div>

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Input;