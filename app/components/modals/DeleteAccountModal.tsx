"use client";
import { useState } from "react";
import { Modal } from "@/app/components/ui/Modal";
import { FormFields, FieldConfig } from "@/app/components/ui/FormFields";
import { SaveButton } from "@/app/components/ui/SaveButton";
import { UsuarioService } from "@/app/services/UsuarioService";

const usuarioService = new UsuarioService();

interface Props {
  onClose: () => void;
  onBack: () => void;
}

export function DeleteAccountModal({ onClose, onBack }: Props) {
  const [senha_hash, setSenha_hash] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDeletar() {
    setErro("");
    setSucesso("");
    setLoading(true);
    try {
      await usuarioService.deletarConta(senha_hash);
      localStorage.removeItem("TOKEN_APLICACAO_FRONT");
      setSucesso("Conta deletada com sucesso!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      setErro(err?.response?.data?.message || "Erro ao deletar conta.");
    } finally {
      setLoading(false);
    }
  }

  const fields: FieldConfig[] = [
    {
      placeholder: "Digite sua senha para confirmar",
      type: "password",
      value: senha_hash,
      onChange: (e) => setSenha_hash(e.target.value),
    },
  ];

  return (
    <Modal onClose={onClose} onBack={onBack}>
      <div className="flex flex-col items-center gap-6">
        <p className="text-center text-gray-600">
          Tem certeza que deseja deletar sua conta? <br />
          <span className="text-red-500 font-semibold">
            Essa ação é irreversível.
          </span>
        </p>

        <FormFields fields={fields} />

        {erro && <p className="text-red-500 text-sm">{erro}</p>}
        {sucesso && <p className="text-green-500 text-sm">{sucesso}</p>}

        <div style={{ marginTop: "16px" }}>
          <SaveButton
            label={loading ? "Deletando..." : "Confirmar exclusão"}
            variant="outline-red"
            onClick={handleDeletar}
          />
        </div>
      </div>
    </Modal>
  );
}
