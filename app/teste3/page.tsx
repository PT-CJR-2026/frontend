"use client";
import { useState } from "react";
import { EditCommentModal } from "../components/modals/EditCommentModal";

export default function TestePage() {
  const [modalAberto, setModalAberto] = useState(false);
  const [comentario, setComentario] = useState("Adorei o produto, funcionou muito bem!");

  return (
    <div className="min-h-screen bg-[#F6F3E4] flex flex-col items-center justify-center gap-6 p-10">
      <h1 className="text-2xl font-bold text-black">Teste — EditCommentModal</h1>

      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow">
        <p className="text-sm text-gray-500 mb-1">Comentário atual:</p>
        <p className="text-black">{comentario}</p>
      </div>

      <button
        onClick={() => setModalAberto(true)}
        className="bg-[#6A38F3] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#5a2dd1] transition"
      >
        Abrir modal de edição
      </button>

      {modalAberto && (
        <EditCommentModal
          avaliacaoProdutoId={1} // ⚠️ troque pelo id real de uma avaliação existente no seu banco
          comentarioAtual={comentario}
          onClose={() => setModalAberto(false)}
          onSalvo={(novoComentario: string) => {
            setComentario(novoComentario);
            console.log("Comentário salvo:", novoComentario);
          }}
        />
      )}
    </div>
  );
}