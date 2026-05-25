"use client";
import { useState, useRef } from "react";
import { Modal } from "@/app/components/ui/Modal";
import { FormFields, FieldConfig } from "@/app/components/ui/FormFields";
import { SaveButton } from "@/app/components/ui/SaveButton";
import { ChangePasswordModal } from "@/app/components/modals/ChangePasswordModal";

interface Props {
  onClose: () => void;
  initialData: {
    name: string;
    username: string;
    email: string;
    avatarUrl?: string;
  };
}

export function EditProfileModal({ onClose, initialData }: Props) {
  const [name, setName] = useState(initialData.name);
  const [username, setUsername] = useState(initialData.username);
  const [email, setEmail] = useState(initialData.email);
  const [avatarPreview, setAvatarPreview] = useState(
    initialData.avatarUrl || "",
  );
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
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

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center gap-5">
        {/* Avatar */}
        <div
          className="relative cursor-pointer mb-2"
          onClick={() => fileRef.current?.click()}
        >
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <img
              src="/image-15.svg"
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}

          <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md">
            <img src="/Vector-112.svg" alt="câmera" width={16} height={16} />
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

        <div className="flex flex-col items-center gap-3 mt-2">
          <SaveButton label="Deletar conta" variant="outline-red" />
          <SaveButton
            label="Alterar senha"
            variant="outline-purple"
            onClick={() => setShowPasswordModal(true)}
          />
          <SaveButton label="Salvar" />
        </div>
      </div>
    </Modal>
  );
}
