import { InputField } from "./InputField";

export interface FieldConfig {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormFields({ fields }: { fields: FieldConfig[] }) {
  return (
    <div className="flex flex-col gap-3 items-center w-full">
      {fields.map((field, i) => (
        <InputField key={i} {...field} />
      ))}
    </div>
  );
}
