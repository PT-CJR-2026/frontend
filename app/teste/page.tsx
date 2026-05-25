"use client";
import { useState } from "react";
import { EditProfileModal } from "@/app/components/modals/EditProfileModal";
import { ChangePasswordModal } from "@/app/components/modals/ChangePasswordModal";

export default function TestPage() {
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex gap-4 p-10 bg-gray-100 min-h-screen">
      <button
        onClick={() => setShowEdit(true)}
        className="px-5 py-2 bg-purple-600 text-white rounded-full text-sm"
      >
        Editar Perfil
      </button>
      <button
        onClick={() => setShowPassword(true)}
        className="px-5 py-2 bg-purple-600 text-white rounded-full text-sm"
      >
        Alterar Senha
      </button>

      {showEdit && (
        <EditProfileModal
          onClose={() => setShowEdit(false)}
          initialData={{
            name: "Ana Silva",
            username: "anasilva",
            email: "ana@email.com",
            avatarUrl: "",
          }}
        />
      )}

      {showPassword && (
        <ChangePasswordModal onClose={() => setShowPassword(false)} />
      )}
    </div>
  );
}
