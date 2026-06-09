"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/app/services/BaseService";
import Navbar from "@/app/components/layout/Navbar";
import CardAvaliacao from "@/app/components/ui/CardAvaliacao";

type Avaliacao = {
  id: string;
  nota: number;
  comentario?: string;
  produtoId?: string;
  usuario: {
    username: string;
    foto_perfil_url?: string;
  };
};

export default function AvaliacaoPage() {
  const { id } = useParams();
  const [avaliacao, setAvaliacao] = useState<Avaliacao | null>(null);

  useEffect(() => {
  async function carregar() {
    try {
      const { data } = await axiosInstance.get(`/avaliacao-produto/${id}/completo`);
      setAvaliacao(data);
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
    <div>
      {avaliacao ? (
        <>
          <div className="bg-[#000000] px-10 py-8 min-h-[395px] text-white flex items-start gap-6">
                {/* Avatar */}
                <img
                    src={avaliacao.usuario.foto_perfil_url ?? "https://placehold.co/120x120/f5f5f5/aaa?text=U"}
                    className="w-24 h-24 rounded-full object-cover ml-5"
                />

                {/* Nome + comentário */}
                <div className="flex flex-col gap-2 flex-1">
                    <p className="text-2xl font-semibold">{avaliacao.usuario.username}</p>
                    {avaliacao.comentario && <p className="text-lg text-gray-300">{avaliacao.comentario}</p>}
                </div>

                {/* Estrelas */}
                <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
                    <span key={i} style={{ fontSize: "40px", color: i <= avaliacao.nota ? "#FFEB3A" : "#4B5563" }}>
                        ★
                    </span>
                    ))}
                </div>
            </div>
          <div>
            <h1>Avaliação {avaliacao.id}</h1>
            <p>Nota: {avaliacao.nota}</p>
            {avaliacao.comentario && <p>{avaliacao.comentario}</p>}
          </div>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
    </div>
  );
}