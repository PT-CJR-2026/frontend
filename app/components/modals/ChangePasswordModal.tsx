"use client";
import { useState } from "react";
import { Modal } from "@/app/components/ui/Modal";
import { FormFields, FieldConfig } from "@/app/components/ui/FormFields";
import { SaveButton } from "@/app/components/ui/SaveButton";

interface Props {
  onClose: () => void;
  onBack?: () => void;
}

export function ChangePasswordModal({ onClose, onBack }: Props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fields: FieldConfig[] = [
    {
      placeholder: "Senha Antiga",
      type: "password",
      value: oldPassword,
      onChange: (e) => setOldPassword(e.target.value),
    },
    {
      placeholder: "Nova Senha",
      type: "password",
      value: newPassword,
      onChange: (e) => setNewPassword(e.target.value),
    },
    {
      placeholder: "Confirmar Senha",
      type: "password",
      value: confirmPassword,
      onChange: (e) => setConfirmPassword(e.target.value),
    },
  ];

  return (
    <Modal onClose={onClose} onBack={onBack}>
      <div className="flex flex-col items-center gap-10">
        <img
          src="/uim_key-skeleton.svg" // ícone de chave
          alt="Chave"
          width={180.64}
          height={180.64}
        />
        <FormFields fields={fields} />
        <SaveButton label="Salvar Senha" />
      </div>
    </Modal>
  );
}
