"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/layout/Navbar";
import { useAuth } from "@/app/hooks/useAuth";

// ─── Tipos ────────────────────────────────────────────────────────────────────
// TODO: mover para @/app/types quando o time padronizar

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  disponivel: boolean;
}

interface Loja {
  id: number;
  nome: string;
  categoria: string;
  logoUrl?: string;
}

interface Avaliacao {
  id: number;
  autor: string;
  avatarUrl?: string;
  texto: string;
  estrelas?: number;
}

interface PerfilUsuario {
  id: number;
  nome: string;
  username: string;
  email: string;
  avatarUrl?: string;
  produtos: Produto[];
  lojas: Loja[];
  avaliacoes: Avaliacao[];
}

// ─── Card de produto inline ───────────────────────────────────────────────────
// TODO: substituir por import CardProduto from "@/app/components/ui/CardProduto"
// quando as props estiverem alinhadas com o componente do time
function CardProduto({ produto }: { produto: Produto }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[120px] max-w-[130px]">
      <div className="w-[120px] h-[120px] bg-white rounded-2xl border border-[#e8e8e8] flex items-center justify-center overflow-hidden relative">
        <Image
          src={produto.imagem || "/placeholder-produto.png"}
          alt={produto.nome}
          fill
          className="object-contain p-3"
        />
      </div>
      <span className="text-[11px] text-[#333] text-center font-medium leading-tight line-clamp-2 w-full">
        {produto.nome}
      </span>
      <span className="text-[12px] font-bold text-[#111]">
        R${produto.preco.toFixed(2).replace(".", ",")}
      </span>
      {!produto.disponivel && (
        <span className="text-[10px] text-red-500 font-semibold uppercase tracking-wide -mt-1">
          Indisponível
        </span>
      )}
    </div>
  );
}

// ─── Card de loja inline ──────────────────────────────────────────────────────
// TODO: substituir por import CardLoja from "@/app/components/ui/CardLoja"
// quando o componente tiver merge na develop
function CardLoja({ loja }: { loja: Loja }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 w-full max-w-[260px] border border-[#e8e8e8]">
      <div>
        <span className="text-[15px] font-semibold text-[#111] block">
          {loja.nome}
        </span>
        <span className="text-[12px] text-[#6A38F3]">{loja.categoria}</span>
      </div>
      {loja.logoUrl && (
        <div className="w-10 h-10 rounded-xl overflow-hidden relative shrink-0">
          <Image
            src={loja.logoUrl}
            alt={loja.nome}
            fill
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}

// ─── Card de avaliação inline ─────────────────────────────────────────────────
function CardAvaliacao({ avaliacao }: { avaliacao: Avaliacao }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#e8e8e8] flex gap-3">
      <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 bg-[#e8e8e8]">
        <Image
          src={avaliacao.avatarUrl || "/placeholder-avatar.png"}
          alt={avaliacao.autor}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-[#111]">
            {avaliacao.autor}
          </span>
          {avaliacao.estrelas && (
            <div className="flex gap-0.5">
              {Array.from({ length: avaliacao.estrelas }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-[11px]">
                  ★
                </span>
              ))}
            </div>
          )}
        </div>
        <p className="text-[12px] text-[#555] leading-relaxed">
          {avaliacao.texto}
        </p>
      </div>
    </div>
  );
}

// ─── Skeleton de carregamento ─────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-[140px] bg-gray-200" />
      <div className="flex flex-col items-start px-6 md:px-10 -mt-10 gap-3">
        <div className="w-[80px] h-[80px] rounded-full bg-gray-200 border-4 border-[#F6F3E4]" />
        <div className="h-5 w-40 bg-gray-200 rounded" />
        <div className="h-3 w-28 bg-gray-200 rounded" />
        <div className="h-3 w-36 bg-gray-200 rounded" />
      </div>
      <div className="flex gap-4 px-6 md:px-10 mt-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-[120px] h-[120px] bg-gray-200 rounded-2xl shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function PerfilPage() {
  const params = useParams();
  const username = params?.username as string;

  // Mesmo hook usado na Navbar/feed — sem duplicar lógica
  const { isLogado, usernameLogado } = useAuth();

  // O usuário logado é o dono deste perfil?
  const isProprietario = isLogado && usernameLogado === username;

  const [usuario, setUsuario] = useState<PerfilUsuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    if (!username) return;

    // GET /usuarios/:username → retorna perfil público com produtos, lojas e avaliações
    // Esta rota deve ser @Public() no NestJS — sem autenticação obrigatória
    async function carregarPerfil() {
      try {
        const res = await fetch(
          `http://localhost:3001/usuario/username/${username}`,
        );
        if (!res.ok) throw new Error("Não encontrado");
        const data: PerfilUsuario = await res.json();
        setUsuario(data);
      } catch {
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }

    carregarPerfil();
  }, [username]);

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
          <h1 className="text-lg font-semibold text-[#111]">
            Usuário não encontrado
          </h1>
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

  // ── Perfil ──
  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      {/* Navbar — mesma da home, já lida com logado/deslogado internamente */}
      <Navbar logoSrc="/logo-branca-stock.io.svg" logoAlt="Stock.IO" />

      {/* Banner de capa */}
      <div className="w-full h-[140px] bg-[#171918] relative overflow-hidden flex items-center px-8">
        <button
          onClick={() => window.history.back()}
          className="text-white text-2xl hover:opacity-70 transition-opacity"
        >
          ‹
        </button>
        {/* TODO: futuramente permitir upload de imagem de capa quando isProprietario */}
      </div>

      <div className="px-6 md:px-10 max-w-4xl mx-auto">
        {/* Avatar + botão editar */}
        <div className="flex items-end justify-between -mt-10 mb-2">
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden border-4 border-[#F6F3E4] shadow bg-[#e8e8e8] shrink-0">
            <Image
              src={usuario.avatarUrl || "/placeholder-avatar.png"}
              alt={usuario.nome}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Botão "Editar Perfil" — só aparece se for o dono do perfil */}
          {isProprietario && (
            <button
              // TODO: abrir EditProfileModal quando o componente tiver merge
              onClick={() => alert("TODO: abrir modal de edição")}
              className="px-5 py-2 bg-[#6A38F3] text-white text-sm font-medium rounded-full hover:bg-[#5a2de0] transition-colors"
            >
              Editar Perfil
            </button>
          )}
        </div>

        {/* Nome, username, email */}
        <div className="mt-3 mb-6">
          <h1 className="text-[20px] font-bold text-[#111]">{usuario.nome}</h1>
          <span className="text-[13px] text-[#777] block mt-0.5">
            @{usuario.username}
          </span>
          <span className="text-[12px] text-[#999] block mt-0.5">
            {usuario.email}
          </span>
        </div>

        {/* ── Seção: Produtos ── */}
        {usuario.produtos.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-semibold text-[#111]">
                Produtos
              </h2>
              {isProprietario && (
                <button
                  onClick={() => alert("TODO: adicionar produto")}
                  className="w-8 h-8 rounded-full bg-[#6A38F3] text-white flex items-center justify-center hover:bg-[#5a2de0] transition-colors text-lg leading-none"
                >
                  +
                </button>
              )}
            </div>
            {/* TODO: substituir por <CarrosselCardProdutos> quando aceitar produtos externos */}
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {usuario.produtos.map((produto) => (
                <div key={produto.id} className="snap-start shrink-0">
                  <CardProduto produto={produto} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Seção: Lojas ── */}
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
            {/* TODO: substituir por <CardLoja> quando tiver merge na develop */}
            <div className="flex flex-col gap-3">
              {usuario.lojas.map((loja) => (
                <CardLoja key={loja.id} loja={loja} />
              ))}
            </div>
          </section>
        )}

        {/* ── Seção: Avaliações ── */}
        {usuario.avaliacoes.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[18px] font-semibold text-[#111] mb-4">
              Avaliações
            </h2>
            <div className="flex flex-col gap-3">
              {usuario.avaliacoes.map((avaliacao) => (
                <CardAvaliacao key={avaliacao.id} avaliacao={avaliacao} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
