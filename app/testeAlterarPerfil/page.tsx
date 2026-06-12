"use client";

import { useState } from "react";
import { UsuarioService } from "@/app/services/UsuarioService";
import { EditProfileModal } from "@/app/components/modals/EditProfileModal";

const usuarioService = new UsuarioService();

export default function TestePage() {
  const [resultado, setResultado] = useState("");
  const [showModal, setShowModal] = useState(false);

  async function testar(fn: () => Promise<any>) {
    try {
      const res = await fn();
      setResultado(JSON.stringify(res, null, 2));
    } catch (err: any) {
      setResultado("ERRO: " + JSON.stringify(err?.response?.data, null, 2));
    }
  }

  return (
    <div
      style={{
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
        Teste
      </h1>

      <button
        onClick={() => testar(() => usuarioService.getMe())}
        style={{
          background: "#7C3AED",
          color: "white",
          border: "none",
          borderRadius: 999,
          padding: "12px 32px",
          fontSize: 16,
          cursor: "pointer",
          width: 300,
        }}
      >
        Buscar meus dados
      </button>

      <button
        onClick={() => setShowModal(true)}
        style={{
          background: "#7C3AED",
          color: "white",
          border: "none",
          borderRadius: 999,
          padding: "12px 32px",
          fontSize: 16,
          cursor: "pointer",
          width: 300,
        }}
      >
        Abrir modal de perfil
      </button>

      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: 20,
          borderRadius: 8,
          width: "100%",
          marginTop: 20,
        }}
      >
        {resultado || "Clique para testar"}
      </pre>

      {showModal && <EditProfileModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
