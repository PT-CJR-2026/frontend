"use client";
import { useState } from "react";
import { Modal } from "@/app/components/ui/Modal";
import { FormFields, FieldConfig } from "@/app/components/ui/FormFields";
import { SaveButton } from "@/app/components/ui/SaveButton";
import { UsuarioService } from "@/app/services/UsuarioService";

const usuarioService = new UsuarioService();

interface Props {
  onClose: () => void;
  onBack?: () => void;
}

export function ChangePasswordModal({ onClose, onBack }: Props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSalvar() {
    setErro("");
    setSucesso("");

    if (newPassword !== confirmPassword) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      await usuarioService.alterarSenha(oldPassword, newPassword);
      setSucesso("Senha alterada com sucesso!");
    } catch (err: any) {
      setErro(err?.response?.data?.message || "Erro ao alterar senha.");
    } finally {
      setLoading(false);
    }
  }

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
          src="/uim_key-skeleton.svg"
          alt="Chave"
          width={180.64}
          height={180.64}
        />
        <FormFields fields={fields} />
        {erro && <p className="text-red-500 text-sm">{erro}</p>}
        {sucesso && <p className="text-green-500 text-sm">{sucesso}</p>}
        <SaveButton
          label={loading ? "Salvando..." : "Salvar Senha"}
          onClick={handleSalvar}
        />
      </div>
    </Modal>
  );
}
