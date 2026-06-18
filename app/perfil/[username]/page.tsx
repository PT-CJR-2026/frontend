"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/layout/Navbar";
import { useAuth } from "@/app/hooks/useAuth";
import { EditProfileModal } from "@/app/components/modals/EditProfileModal";
import CardProduto, { Produto } from "@/app/components/ui/CardProduto";
import { CardLoja } from "@/app/components/ui/CardLoja";

// ─── Tipos do backend ─────────────────────────────────────────────────────────
interface ProdutoBackend {
  id: number;
  nome: string;
  descricao?: string | null;
  preco: string | number;
  estoque: number;
  categoria: { id: number; nome: string };
  imagem_produto: { id: number; url_imagem: string; ordem: number }[];
}

interface LojaBackend {
  id: number;
  nome: string;
  descricao?: string | null;
  logo_url?: string | null;
  banner_url?: string | null;
  produtos: ProdutoBackend[];
}

interface AvaliacaoLoja {
  id: number;
  nota: number;
  comentario?: string | null;
  created_at: string;
  loja: {
    id: number;
    nome: string;
    logo_url?: string | null;
  };
}

interface AvaliacaoProduto {
  id: number;
  nota: number;
  comentario?: string | null;
  created_at: string;
  produto: {
    id: number;
    nome: string;
    imagem_produto: { url_imagem: string; ordem: number }[];
  };
}

interface PerfilUsuario {
  id: number;
  nome: string;
  username: string;
  email: string;
  foto_perfil_url?: string | null;
  lojas: LojaBackend[];
  avaliacao_loja: AvaliacaoLoja[];
  avaliacao_produto: AvaliacaoProduto[];
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-[140px] bg-gray-200" />
      <div className="px-6 md:px-10 max-w-4xl mx-auto">
        <div className="flex items-end justify-between -mt-10 mb-2">
          <div className="w-[80px] h-[80px] rounded-full bg-gray-200 border-4 border-[#F6F3E4]" />
        </div>
        <div className="mt-3 flex flex-col gap-2 mb-8">
          <div className="h-5 w-48 bg-gray-200 rounded" />
          <div className="h-3 w-28 bg-gray-200 rounded" />
          <div className="h-3 w-40 bg-gray-200 rounded" />
        </div>
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-[120px] h-[120px] bg-gray-200 rounded-2xl shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function PerfilPage() {
  const params = useParams();
  const username = params?.username as string;

  const { isLogado, usernameLogado } = useAuth();
  const isProprietario = isLogado && usernameLogado === username;

  const [usuario, setUsuario] = useState<PerfilUsuario | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  async function carregarPerfil(usernameParam: string) {
    try {
      const res = await fetch(`http://localhost:3001/usuario/username/${usernameParam}`);
      if (!res.ok) throw new Error("Não encontrado");
      const data: PerfilUsuario = await res.json();
      setUsuario(data);
    } catch {
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (!username) return;
    carregarPerfil(username);
  }, [username]);

  // Todos os produtos de todas as lojas do usuário num único array
  // com referência à loja para o CardProduto mostrar o logo
  const todosProdutos: Produto[] = usuario?.lojas.flatMap((loja) =>
    loja.produtos.map((p) => ({
      ...p,
      preco: p.preco,
      loja: {
        nome: loja.nome,
        logo_url: loja.logo_url ?? null,
      },
    }))
  ) ?? [];

  // ── Carregando ──
  if (carregando) {
    return (
      <div className="min-h-screen bg-[#F6F3E4]">
        <Navbar logoSrc="/logo-branca-stock.io.svg" logoAlt="Stock.IO" />
        <Skeleton />
      </div>
    );
  }

  // ── Erro ──
  if (erro || !usuario) {
    return (
      <div className="min-h-screen bg-[#F6F3E4]">
        <Navbar logoSrc="/logo-branca-stock.io.svg" logoAlt="Stock.IO" />
        <div className="flex flex-col items-center justify-center gap-4 mt-32 px-4">
          <span className="text-5xl">😕</span>
          <h1 className="text-lg font-semibold text-[#111]">Usuário não encontrado</h1>
          <p className="text-sm text-[#777] text-center">
            O perfil que você está procurando não existe ou foi removido.
          </p>
          <Link
            href="/"
            className="mt-2 px-6 py-2.5 bg-[#6A38F3] text-white text-sm font-medium rounded-full hover:bg-[#5a2de0] transition-colors"
          >
            Voltar para a home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      <Navbar logoSrc="/logo-branca-stock.io.svg" logoAlt="Stock.IO" />

      {/* Banner */}
      <div className="w-full h-[160px] bg-[#171918] flex items-start px-8 pt-4">
        <button
          onClick={() => window.history.back()}
          className="text-white text-5xl font-light hover:opacity-70 transition-opacity leading-none"
        >
          ‹
        </button>
      </div>

      {/* Seção do perfil */}
      <div>

        {/* Avatar sobrepondo o banner — 180px da borda esquerda */}
        <div className="-mt-[115px] mb-1 ml-[180px]">
          <div className="w-[230px] h-[230px] rounded-full overflow-hidden border-4 border-[#F6F3E4] shadow-lg bg-[#e8e8e8]">
            <img
              src={usuario.foto_perfil_url || "/ion_person.svg"}
              alt={usuario.nome}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info + botão editar — alinhados com o avatar */}
        <div className="flex items-start justify-between mb-6 ml-[180px] pr-10">
          <div className="flex flex-col" style={{ gap: "6px" }}>
            <h1 style={{ width: "318px" }} className="text-[22px] font-bold text-[#111] leading-none m-0 p-0">{usuario.nome}</h1>
            <span style={{ width: "218px" }} className="text-[15px] text-[#777] leading-none">@ {usuario.username}</span>
            <div className="flex items-center gap-[6px]">
              <img src="/Vector.svg" alt="email" width={16} height={16} />
              <span style={{ width: "441px" }} className="text-[15px] text-[#999] leading-none">{usuario.email}</span>
            </div>
          </div>

          {isProprietario && (
            <button
              onClick={() => setModalAberto(true)}
              className="px-6 py-2 bg-[#6A38F3] text-white text-sm font-medium rounded-full hover:bg-[#5a2de0] transition-colors"
            >
              Editar Perfil
            </button>
          )}
        </div>

        {/* ── Produtos (todos os produtos de todas as lojas) ── */}
        {todosProdutos.length > 0 && (
          <section className="mb-8 px-[180px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-semibold text-[#111]">Produtos</h2>
              {isProprietario && (
                <button
                  onClick={() => alert("TODO: adicionar produto")}
                  className="w-8 h-8 rounded-full bg-[#6A38F3] text-white flex items-center justify-center hover:bg-[#5a2de0] transition-colors text-lg leading-none"
                >
                  +
                </button>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {todosProdutos.map((produto) => (
                <div key={produto.id} className="snap-start shrink-0">
                  <CardProduto produto={produto} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Lojas ── */}
        {usuario.lojas.length > 0 && (
          <section className="mb-8 px-[180px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-semibold text-[#111]">Lojas</h2>
              {isProprietario && (
                <button
                  onClick={() => alert("TODO: adicionar loja")}
                  className="w-8 h-8 rounded-full bg-[#6A38F3] text-white flex items-center justify-center hover:bg-[#5a2de0] transition-colors text-lg leading-none"
                >
                  +
                </button>
              )}
            </div>
            <div className="flex flex-col gap-3">
              {usuario.lojas.map((loja) => (
                <div key={loja.id} className="flex items-center justify-between bg-white rounded-2xl px-8 py-6 w-full max-w-[500px] shadow-sm">
                  <div className="flex flex-col gap-2">
                    <span className="text-[26px] font-bold text-[#111] leading-tight">{loja.nome}</span>
                    <span className="text-[15px] text-[#6A38F3] font-medium">{loja.descricao ?? ""}</span>
                  </div>
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-[#f5f0ff] shrink-0 flex items-center justify-center">
                    {loja.logo_url ? (
                      <img src={loja.logo_url} alt={loja.nome} className="w-full h-full object-contain p-2" />
                    ) : (
                      <span className="text-[#6A38F3] text-xs font-bold text-center px-1">{loja.nome}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Avaliações ── */}
        {(usuario.avaliacao_loja?.length > 0 || usuario.avaliacao_produto?.length > 0) && (
          <section className="mb-10 px-[180px]">
            <h2 className="text-[18px] font-semibold text-[#111] mb-4">Avaliações</h2>
            <div className="flex flex-col gap-3">

              {/* Avaliações de loja */}
              {usuario.avaliacao_loja?.map((av) => (
                <div key={`loja-${av.id}`} className="bg-white rounded-2xl p-5 flex gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-[#f0eef9] shrink-0 overflow-hidden flex items-center justify-center">
                    {av.loja.logo_url ? (
                      <img src={av.loja.logo_url} alt={av.loja.nome} className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="text-[10px] font-bold text-[#6A38F3] text-center px-1">{av.loja.nome}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-semibold text-[#111]">{av.loja.nome}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: av.nota }).map((_, i) => (
                          <span key={i} className="text-yellow-400 text-[13px]">★</span>
                        ))}
                        {Array.from({ length: 5 - av.nota }).map((_, i) => (
                          <span key={i} className="text-gray-300 text-[13px]">★</span>
                        ))}
                      </div>
                    </div>
                    {av.comentario && (
                      <p className="text-[13px] text-[#555] leading-relaxed">{av.comentario}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Avaliações de produto */}
              {usuario.avaliacao_produto?.map((av) => (
                <div key={`produto-${av.id}`} className="bg-white rounded-2xl p-5 flex gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-[#f0eef9] shrink-0 overflow-hidden flex items-center justify-center">
                    {av.produto.imagem_produto[0] ? (
                      <img src={av.produto.imagem_produto[0].url_imagem} alt={av.produto.nome} className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="text-[10px] font-bold text-[#6A38F3] text-center px-1">{av.produto.nome}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-semibold text-[#111]">{av.produto.nome}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: av.nota }).map((_, i) => (
                          <span key={i} className="text-yellow-400 text-[13px]">★</span>
                        ))}
                        {Array.from({ length: 5 - av.nota }).map((_, i) => (
                          <span key={i} className="text-gray-300 text-[13px]">★</span>
                        ))}
                      </div>
                    </div>
                    {av.comentario && (
                      <p className="text-[13px] text-[#555] leading-relaxed">{av.comentario}</p>
                    )}
                  </div>
                </div>
              ))}

            </div>
          </section>
        )}

      </div>

      {/* Modal de editar perfil */}
      {isProprietario && modalAberto && (
        <EditProfileModal
          onClose={() => setModalAberto(false)}
          onSalvar={() => carregarPerfil(username)}
        />
      )}
    </div>
  );
}