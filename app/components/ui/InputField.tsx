interface InputFieldProps {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({
  placeholder,
  type = "text",
  value,
  onChange,
}: InputFieldProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ width: "385px", height: "50px" }}
      className="px-5 rounded-full bg-white border-none text-sm text-gray-500 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400"
    />
  );
}
