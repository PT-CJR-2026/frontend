"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/app/components/ui/Modal";
import { FormFields, FieldConfig } from "@/app/components/ui/FormFields";
import { SaveButton } from "@/app/components/ui/SaveButton";
import { ChangePasswordModal } from "@/app/components/modals/ChangePasswordModal";
import { DeleteAccountModal } from "@/app/components/modals/DeleteAccountModal";
import { UsuarioService } from "@/app/services/UsuarioService";

const usuarioService = new UsuarioService();

interface Props {
  onClose: () => void;
}

export function EditProfileModal({ onClose }: Props) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameOriginal, setUsernameOriginal] = useState(""); // ← guarda o username antes de editar
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const usuario = await usuarioService.getMe();
        setName(usuario.nome);
        setUsername(usuario.username);
        setUsernameOriginal(usuario.username); // ← salva o original
        setEmail(usuario.email);
        setAvatarPreview(usuario.foto_perfil_url || "");
      } catch {
        setErro("Erro ao carregar dados do usuário.");
      }
    }
    carregarDados();
  }, []);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSalvar() {
    setErro("");
    setSucesso("");
    setLoading(true);
    try {
      await Promise.all([
        usuarioService.alterarNome(name),
        usuarioService.alterarUsername(username),
        usuarioService.alterarEmail(email),
      ]);

      setSucesso("Perfil atualizado com sucesso!");

      // Se o username mudou, redireciona para o novo perfil após 1.5s
      // Se não mudou, fica na mesma página
      if (username !== usernameOriginal) {
        setTimeout(() => {
          onClose();
          router.push(`/perfil/${username}`);
        }, 1500);
      }
    } catch (err: any) {
      setErro(err?.response?.data?.message || "Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  }

  const fields: FieldConfig[] = [
    {
      placeholder: "Nome",
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    {
      placeholder: "Username",
      value: username,
      onChange: (e) => setUsername(e.target.value),
    },
    {
      placeholder: "Email",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
  ];

  if (showPasswordModal) {
    return (
      <ChangePasswordModal
        onClose={onClose}
        onBack={() => setShowPasswordModal(false)}
      />
    );
  }

  if (showDeleteModal) {
    return (
      <DeleteAccountModal
        onClose={onClose}
        onBack={() => setShowDeleteModal(false)}
      />
    );
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center gap-5">
        <div
          className="relative cursor-pointer"
          onClick={() => fileRef.current?.click()}
        >
          <img
            src={avatarPreview || "/ion_person.svg"}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover bg-gray-300"
          />
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md">
            <img
              src="/Group-17.svg"
              alt="alterar foto"
              width={24}
              height={24}
            />
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <FormFields fields={fields} />

        {erro && <p className="text-red-500 text-sm">{erro}</p>}
        {sucesso && <p className="text-green-500 text-sm">{sucesso}</p>}

        <div className="flex flex-col items-center gap-3 mt-2">
          <SaveButton
            label="Deletar conta"
            variant="outline-red"
            onClick={() => setShowDeleteModal(true)}
          />
          <SaveButton
            label="Alterar senha"
            variant="outline-purple"
            onClick={() => setShowPasswordModal(true)}
          />
          <SaveButton
            label={loading ? "Salvando..." : "Salvar"}
            onClick={handleSalvar}
          />
        </div>
      </div>
    </Modal>
  );
}
