"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ApiService, axiosInstance } from "@/app/services/BaseService";
import Navbar from "@/app/components/layout/Navbar";
import { useAuth } from "@/app/hooks/useAuth";
import { EditCommentModal } from "@/app/components/modals/EditCommentModal";

new ApiService("/comentario-avaliacao");

type Avaliacao = {
  id: string;
  nota: number;
  comentario?: string;
  produtoId?: string;
  created_at?: string;
  usuario: {
    id: number;
    username: string;
    foto_perfil_url?: string;
  };
};

type Comentario = {
  id: number;
  conteudo: string;
  created_at: string;
  papel?: string;
  usuario: {
    id: number;
    username: string;
    foto_perfil_url?: string;
  };
};

export default function AvaliacaoPage() {
  const { id: idParam } = useParams();
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  const router = useRouter();
  const { isLogado, idLogado } = useAuth();

  const [avaliacao, setAvaliacao] = useState<Avaliacao | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [erro, setErro] = useState(false);
  const [modalAvaliacaoAberto, setModalAvaliacaoAberto] = useState(false);
  const [modalComentarioId, setModalComentarioId] = useState<number | null>(null);

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

  async function carregarComentarios() {
    try {
      const response = await axiosInstance.get(`/comentario-avaliacao/produto/${id}`);
      setComentarios(response.data);
    } catch (err: any) {
      console.log("Erro ao carregar comentários:", err.response);
    }
  }

  const enviarComentario = async () => {
    if (!novoComentario.trim()) return;
    try {
      await axiosInstance.post(`/comentario-avaliacao`, {
        conteudo: novoComentario,
        avaliacao_produto_id: Number(id),
      });
      setNovoComentario("");
      await carregarComentarios();
    } catch (err) {
      console.error("Erro ao enviar comentário:", err);
    }
  };

  const deletarAvaliacao = async () => {
    try {
      await axiosInstance.delete(`/avaliacao-produto/${avaliacao?.id}`);
      router.back();
    } catch (err) {
      console.error("Erro ao deletar avaliação:", err);
    }
  };

  const deletarComentario = async (comentarioId: number) => {
    try {
      await axiosInstance.delete(`/comentario-avaliacao/${comentarioId}`);
      await carregarComentarios();
    } catch (err) {
      console.error("Erro ao deletar comentário:", err);
    }
  };

  useEffect(() => {
    async function carregar() {
      try {
        const avaliacaoResponse = await axiosInstance.get(`/avaliacao-produto/${id}`);
        setAvaliacao(avaliacaoResponse.data);
      } catch (err: any) {
        console.log(err.response);
        setErro(true);
        return;
      }
      await carregarComentarios();
    }
    if (id) carregar();
  }, [id]);

  if (erro) return <p>Erro ao carregar avaliação.</p>;
  if (!avaliacao) return <p>Carregando...</p>;

  const ehDonoDaAvaliacao = isLogado && idLogado === avaliacao.usuario.id;
  const comentarioDoModal = comentarios.find((c) => c.id === modalComentarioId);

  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      <Navbar logoSrc="/logo-branca-stock.io.svg" />

      {/* Seção preta — avaliação */}
      <div className="bg-black text-white px-10 py-8 min-h-[395px] flex flex-col gap-6">

        {/* Linha superior: seta + avatar + nome/tempo + estrelas + ações */}
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

          {/* Ações — só para o dono da avaliação */}
          {ehDonoDaAvaliacao && (
            <>
              {/* Lápis — editar avaliação */}
              <button
                onClick={() => setModalAvaliacaoAberto(true)}
                className="ml-2 text-white/60 hover:text-white transition"
                aria-label="Editar avaliação"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              {/* Lixeira — deletar avaliação */}
              <button
                onClick={deletarAvaliacao}
                className="ml-1 text-white/60 hover:text-red-500 transition"
                aria-label="Excluir avaliação"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Comentário da avaliação */}
        {avaliacao.comentario && (
          <p className="text-4xl text-gray-300 ml-28">{avaliacao.comentario}</p>
        )}
      </div>

      {/* Seção bege — comentários + input */}
      <div className="flex flex-col px-6 py-6 gap-6">

        {/* Lista de comentários */}
        <div className="border-l border-black pl-8 ml-[200px] flex flex-col gap-6 min-h-[40px]">
          {comentarios.length === 0 ? (
            <p className="text-gray-400 text-sm">Nenhum comentário ainda.</p>
          ) : (
            comentarios.map((comentario) => {
              const ehDonoDoComentario = isLogado && idLogado === comentario.usuario.id;

              return (
                <div key={comentario.id} className="flex gap-4 items-start">
                  <img
                    src={comentario.usuario.foto_perfil_url ?? "https://placehold.co/56x56/f5f5f5/aaa?text=U"}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex gap-2 items-center">
                      <p className="font-semibold text-xl text-black">{comentario.usuario.username}</p>
                      {comentario.papel && (
                        <span className="text-purple-500 text-sm">{comentario.papel}</span>
                      )}
                      <span className="text-gray-500 text-sm">{tempoAtras(comentario.created_at)}</span>

                      {/* Ações — só para o dono do comentário */}
                      {ehDonoDoComentario && (
                        <>
                          {/* Lápis — editar comentário */}
                          <button
                            onClick={() => setModalComentarioId(comentario.id)}
                            className="ml-2 text-gray-400 hover:text-black transition"
                            aria-label="Editar comentário"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>

                          {/* Lixeira — deletar comentário */}
                          <button
                            onClick={() => deletarComentario(comentario.id)}
                            className="ml-1 text-gray-400 hover:text-red-500 transition"
                            aria-label="Excluir comentário"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                    <p className="text-lg text-black">{comentario.conteudo}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input de comentário — só para logados */}
        {isLogado && (
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
        )}
      </div>

      {/* Modal editar avaliação */}
      {modalAvaliacaoAberto && (
        <EditCommentModal
          avaliacaoProdutoId={avaliacao.id}
          comentarioAtual={avaliacao.comentario}
          onClose={() => setModalAvaliacaoAberto(false)}
          onSalvo={(novoTexto) => {
            setAvaliacao({ ...avaliacao, comentario: novoTexto });
          }}
        />
      )}

      {/* Modal editar comentário */}
      {modalComentarioId !== null && comentarioDoModal && (
        <EditCommentModal
          avaliacaoProdutoId={String(modalComentarioId)}
          comentarioAtual={comentarioDoModal.conteudo}
          tipo="comentario"
          onClose={() => setModalComentarioId(null)}
          onSalvo={(novoTexto) => {
            setComentarios((prev) =>
              prev.map((c) =>
                c.id === modalComentarioId ? { ...c, conteudo: novoTexto } : c
              )
            );
          }}
        />
      )}
    </div>
  );
}