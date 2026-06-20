"use client";
import { useEffect, useState } from "react";
import Button from "@/app/components/ui/Button";
import { ApiService, axiosInstance } from "@/app/services/BaseService";

new ApiService("/comentario-avaliacao");

interface Props {
  avaliacaoProdutoId: number | string;
  comentarioAtual?: string;
  tipo?: "avaliacao" | "comentario";
  onClose: () => void;
  onSalvo?: (novoComentario: string) => void;
}

export function EditCommentModal({
  avaliacaoProdutoId,
  comentarioAtual = "",
  tipo = "avaliacao",
  onClose,
  onSalvo,
}: Props) {
  const [comentario, setComentario] = useState(comentarioAtual);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  // Fecha com a tecla Esc
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  async function handleSalvar() {
    setErro("");
    setSalvando(true);
    try {
      const url = tipo === "comentario"
        ? `/comentario-avaliacao/${avaliacaoProdutoId}`
        : `/avaliacao-produto/${avaliacaoProdutoId}`;

      const body = tipo === "comentario"
        ? { conteudo: comentario }
        : { comentario };

      await axiosInstance.patch(url, body);
      onSalvo?.(comentario);
      onClose();
    } catch (err) {
      console.error("Erro ao editar:", err);
      setErro("Não foi possível salvar. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    // Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {/* Card cinza */}
      <div className="relative w-full max-w-2xl bg-[#ECECEC] rounded-3xl p-6 shadow-xl">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-5 right-6 text-black hover:opacity-60 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Caixa branca - textarea */}
        <div className="bg-white rounded-2xl px-6 py-5 min-h-[340px] mt-2">
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Comentário"
            className="w-full h-[300px] resize-none outline-none text-gray-700 placeholder:text-gray-400 text-base"
            autoFocus
          />
        </div>

        {erro && (
          <p className="text-red-500 text-sm text-center mt-3">{erro}</p>
        )}

        {/* Botão Avaliar */}
        <div className="mt-6">
          <Button onClick={handleSalvar} loading={salvando}>
            Avaliar
          </Button>
        </div>
      </div>
    </div>
  );
}