"use client";

import { useState } from "react";
import { UsuarioService } from "@/app/services/UsuarioService";

const usuarioService = new UsuarioService();

export default function TestePage() {
  const [resultado, setResultado] = useState("");

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
      style={{ padding: 40, display: "flex", flexDirection: "column", gap: 12 }}
    >
      <h1>Teste</h1>

      <button onClick={() => testar(() => usuarioService.getMe())}>
        Buscar meus dados
      </button>

      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: 20,
          marginTop: 20,
        }}
      >
        {resultado || "Clique para buscar"}
      </pre>
    </div>
  );
}
