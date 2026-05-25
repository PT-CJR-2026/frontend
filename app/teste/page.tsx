"use client";
import { useState } from "react";
import { EditProfileModal } from "@/app/components/modals/EditProfileModal";

export default function TestPage() {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="flex gap-4 p-10 bg-gray-100 min-h-screen items-start">
      <button
        onClick={() => setShowEdit(true)}
        className="px-5 py-2 bg-purple-600 text-white rounded-full text-sm h-10 w-auto"
      >
        Editar Perfil
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
    </div>
  );
}
