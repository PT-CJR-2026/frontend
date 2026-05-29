'use client';

import { useState } from "react";
import CriaProduto from "../produto/modal-cria-produto";
import EditaProduto from "../produto/modal-edita-produto";

// Produto mockado para simular dados vindos do Prisma
const produtoMock = {
  id: "1",
  nome: "Produto Teste",
  descricao: "Essa descricao absurdamentde grande de teste para ativar a rolaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaagem",
  preco: 99.90,
  estoque: 10,
  subcategoria: "eletronicos",
};

export default function Teste() {
  const [modalAberto, setModalAberto] = useState<"criar" | "editar" | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 gap-4">
      
      <button
        onClick={() => setModalAberto("criar")}
        className="px-5 py-3 rounded-2xl bg-violet-500 text-white font-semibold text-sm hover:bg-violet-600 transition-all"
      >
        Abrir Criar Produto
      </button>

      <button
        onClick={() => setModalAberto("editar")}
        className="px-5 py-3 rounded-2xl bg-white text-gray-800 font-semibold text-sm hover:bg-gray-100 border border-gray-200 transition-all"
      >
        Abrir Editar Produto
      </button>

      {modalAberto === "criar" && (
        <CriaProduto
          onClose={() => setModalAberto(null)}
          onSucesso={() => console.log("Produto criado com sucesso!")}
        />
      )}

      {modalAberto === "editar" && (
        <EditaProduto
          produto={produtoMock}
          onClose={() => setModalAberto(null)}
          onSucesso={() => console.log("Produto atualizado/deletado com sucesso!")}
        />
      )}

    </div>
  );
}