"use client";
import { useState } from "react";
import { ApiService, axiosInstance } from "@/app/services/BaseService";
import Button from "@/app/components/ui/Button";

new ApiService("/avaliacao-produto"); // garante que o interceptor de auth está ativo

interface Props {
  produtoId: number;
  nomeProduto: string;
  onClose: () => void;
  onCriado?: (novaAvaliacao: { id: number; nota: number; comentario: string }) => void;
}

export function CreateAvaliacaoModal({
  produtoId,
  nomeProduto,
  onClose,
  onCriado,
}: Props) {
  const [nota, setNota] = useState(0);
  const [notaHover, setNotaHover] = useState(0);
  const [comentario, setComentario] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleAvaliar() {
    if (nota === 0) {
      setErro("Selecione uma nota antes de avaliar.");
      return;
    }

    setErro("");
    setSalvando(true);
    try {
      const response = await axiosInstance.post("/avaliacao-produto", {
        produto_id: produtoId,
        nota,
        comentario,
      });
      onCriado?.(response.data);
      onClose();
    } catch (err) {
      console.error("Erro ao criar avaliação:", err);
      setErro("Não foi possível enviar sua avaliação. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
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

        {/* Título */}
        <h2 className="text-2xl text-[#1a1a1a] text-center mb-6 mt-2">
          Você está avaliando <span className="font-bold">{nomeProduto}</span>
        </h2>

        {/* Estrelas clicáveis */}
        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3, 4, 5].map((valor) => {
            const preenchida = valor <= (notaHover || nota);
            return (
              <button
                key={valor}
                type="button"
                onClick={() => setNota(valor)}
                onMouseEnter={() => setNotaHover(valor)}
                onMouseLeave={() => setNotaHover(0)}
                aria-label={`${valor} estrela${valor > 1 ? "s" : ""}`}
                className="transition-transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-10 h-10"
                  fill={preenchida ? "#6A38F3" : "none"}
                  stroke="#6A38F3"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.98 20.539a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </button>
            );
          })}
        </div>

        {/* Caixa branca - textarea */}
        <div className="bg-white rounded-2xl px-6 py-5 min-h-[260px]">
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Avaliação do produto"
            className="w-full h-[220px] resize-none outline-none text-gray-700 placeholder:text-gray-400 text-base"
            autoFocus
          />
        </div>

        {erro && (
          <p className="text-red-500 text-sm text-center mt-3">{erro}</p>
        )}

        {/* Botão Avaliar */}
        <div className="mt-6">
          <Button onClick={handleAvaliar} loading={salvando}>
            Avaliar
          </Button>
        </div>
      </div>
    </div>
  );
}