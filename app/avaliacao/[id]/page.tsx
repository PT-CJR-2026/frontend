"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { axiosInstance } from "@/app/services/BaseService";
import Navbar from "@/app/components/layout/Navbar";

type Avaliacao = {
  id: string;
  nota: number;
  comentario?: string;
  produtoId?: string;
  created_at?: string;
  usuario: {
    username: string;
    foto_perfil_url?: string;
  };
};

type Comentario = {
  id: number;
  conteudo: string;
  created_at: string;
  papel?: string; // ex: "dona da loja"
  usuario: {
    username: string;
    foto_perfil_url?: string;
  };
};

export default function AvaliacaoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [avaliacao, setAvaliacao] = useState<Avaliacao | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState("");

  function tempoAtras(data?: string | Date) {
    if (!data) return "data desconhecida";
    const agora = new Date();
    const criacao = new Date(data);
    const diffMs = agora.getTime() - criacao.getTime();
    const minutos = Math.floor(diffMs / 1000 / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    if (minutos < 1) return "agora mesmo";
    if (minutos < 60) return `${minutos} min`;
    if (horas < 24) return `${horas} h`;
    if (dias < 7) return `${dias} dias`;
    const semanas = Math.floor(dias / 7);
    if (semanas < 4) return `${semanas} semanas`;
    const meses = Math.floor(dias / 30);
    return `${meses} meses`;
  }

  const enviarComentario = async () => {
  if (!novoComentario.trim()) return;
  
  try {
    await axiosInstance.post(`/comentario`, {
      conteudo: novoComentario,
      avaliacao_produto_id: id,
    });
    
    setNovoComentario(""); // limpa o input
  } catch (err) {
    console.error("Erro ao enviar comentário:", err);
  }
};

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await axiosInstance.get(`/avaliacao-produto/${id}/completo`);
        setAvaliacao(data);
        setComentarios(data.comentarios ?? []);
      } catch (err) {
        console.error("Erro ao carregar avaliação:", err);
      }
    }
    if (id) carregar();
  }, [id]);

  if (!avaliacao) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      <Navbar logoSrc="/logo-branca-stock.io.svg" />

      {/* Seção preta — avaliação */}
      <div className="bg-black text-white px-10 py-8 min-h-[395px] flex flex-col gap-6">

        {/* Linha superior: seta + avatar + nome/tempo + estrelas */}
        <div className="flex items-center gap-4">

          {/* Seta voltar */}
          <button
            onClick={() => router.back()}
            className="text-white text-3xl font-light mr-2 hover:opacity-70"
          >
            ‹
          </button>

          {/* Avatar */}
          <img
            src={avaliacao.usuario.foto_perfil_url ?? "https://placehold.co/96x96/f5f5f5/aaa?text=U"}
            className="w-20 h-20 rounded-full object-cover flex-shrink-0"
          />

          {/* Nome + tempo */}
          <div className="flex items-baseline gap-3 flex-1">
            <p className="text-3xl font-semibold">{avaliacao.usuario.username}</p>
            <p className="text-[#F6F3E4B0] text-base">{tempoAtras(avaliacao.created_at)}</p>
          </div>

          {/* Estrelas */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
              <span
                key={i}
                style={{ fontSize: "36px", color: i <= avaliacao.nota ? "#FFEB3A" : "#4B5563" }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Comentário da avaliação */}
        {avaliacao.comentario && (
          <p className="text-4xl text-gray-300 ml-28">{avaliacao.comentario}</p>
        )}
      </div>

      {/* Seção bege — comentários + input */}
      <div className="flex flex-col px-6 py-6 gap-6">

       {/* Lista de comentários */}
        <div className="border-l border-black pl-8 ml-4 flex flex-col gap-6 min-h-[40px]">
          {comentarios.length === 0 ? (
            <p className="text-gray-400 text-sm">Nenhum comentário ainda.</p>
          ) : (
            comentarios.map((comentario) => (
              <div key={comentario.id} className="flex gap-4 items-start">
                <img
                  src={comentario.usuario.foto_perfil_url ?? "https://placehold.co/56x56/f5f5f5/aaa?text=U"}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <div className="flex gap-2 items-center">
                    <p className="font-semibold text-xl">{comentario.usuario.username}</p>
                    {comentario.papel && (
                      <span className="text-purple-500 text-sm">{comentario.papel}</span>
                    )}
                    <span className="text-gray-500 text-sm">{tempoAtras(comentario.created_at)}</span>
                  </div>
                  <p className="text-lg">{comentario.conteudo}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input fixo na parte inferior */}
        <div className="flex items-center gap-3 px-4 mt-4">
          <input
            type="text"
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            placeholder="Adicionar comentário"
            className="flex-1 rounded-full bg-gray-200 px-6 py-4 outline-none text-black text-base"
          />
          <button
            className="text-gray-500 hover:text-black transition"
            onClick={enviarComentario}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}