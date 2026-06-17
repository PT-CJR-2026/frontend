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

interface PerfilUsuario {
  id: number;
  nome: string;
  username: string;
  email: string;
  foto_perfil_url?: string | null;
  lojas: LojaBackend[];
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
          className="text-white text-2xl hover:opacity-70 transition-opacity"
        >
          ‹
        </button>
      </div>

      {/* Seção do perfil */}
      <div>

        {/* Avatar sobrepondo o banner — 180px da borda esquerda */}
        <div className="-mt-[115px] mb-4 ml-[180px]">
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
          <div className="flex flex-col gap-[4px]">
            <h1 style={{ width: "318px", height: "43px" }} className="text-[22px] font-bold text-[#111] leading-none flex items-center m-0">{usuario.nome}</h1>
            <div style={{ width: "218px", height: "27px" }} className="flex items-center">
              <span className="text-[13px] text-[#777]">@ {usuario.username}</span>
            </div>
            <div style={{ width: "441px", height: "28px" }} className="flex items-center">
              <span className="text-[12px] text-[#999]">{usuario.email}</span>
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
          <section className="mb-8">
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
          <section className="mb-8">
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
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x scrollbar-hide">
              {usuario.lojas.map((loja) => (
                <CardLoja
                  key={loja.id}
                  loja={{
                    id: loja.id,
                    nome: loja.nome,
                    // categoria não existe na loja — usando descrição ou string vazia
                    categoria: loja.descricao ?? "",
                    logoUrl: loja.logo_url ?? "",
                  }}
                />
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