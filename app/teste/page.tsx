"use client";
import { useState } from "react";
import { EditProfileModal } from "@/components/modals/EditProfileModal";
import { ChangePasswordModal } from "@/components/modals/ChangePasswordModal";

export default function TestPage() {
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex gap-4 p-10">
      <button
        onClick={() => setShowEdit(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded-full"
      >
        Abrir Editar Perfil
      </button>
      <button
        onClick={() => setShowPassword(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded-full"
      >
        Abrir Alterar Senha
      </button>

      {showEdit && (
        <EditProfileModal
          onClose={() => setShowEdit(false)}
          initialData={{
            name: "Ana",
            username: "ana123",
            email: "ana@email.com",
          }}
        />
      )}
      {showPassword && (
        <ChangePasswordModal onClose={() => setShowPassword(false)} />
      )}
    </div>
  );
}
