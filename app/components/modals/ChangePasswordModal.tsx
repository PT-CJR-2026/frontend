"use client";
import { useState } from "react";
import { Modal } from "../ui/Modal";
import { FormFields, FieldConfig } from "../ui/FormFields";
import { SaveButton } from "../ui/SaveButton";
import Vector 112 from "../../assets/Vector 112.svg";
import uim_key-skeleton from "../../assets/uim_key-skeleton.svg";
import Image 15 from "../../assets/Image 15.svg";

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

        {/* Ícone de chave — substitua pelo seu SVG */}
        <svg
          width="90"