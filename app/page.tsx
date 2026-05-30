"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import CarrosselCardProdutos from "@/app/components/ui/Carrossel";
import { Produto } from "@/app/components/ui/CardProduto";
import { useAuth } from "@/app/hooks/useAuth";
import { ProdutoService } from "@/app/services/ProdutoService";

// ─── Categorias (estáticas) ──────────────────────────────────────────────────

const CATEGORIAS = [
  { label: "Mercado", icon: "/icons/mercado.svg" },
  { label: "Farmácia", icon: "/icons/farmacia.svg" },
  { label: "Beleza", icon: "/icons/beleza.svg" },
  { label: "Moda", icon: "/icons/moda.svg" },
  { label: "Eletrônicos", icon: "/icons/eletronicos.svg" },
  { label: "Jogos", icon: "/icons/jogos.svg" },
  { label: "Brinquedos", icon: "/icons/brinquedos.svg" },
  { label: "Casa", icon: "/icons/casa.svg" },
];

// ─── Ícones inline ────────────────────────────────────────────────────────────

function IconePerfil() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function IconeSair() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function IconeBusca() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#888"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({
  isLogado,
  onLogout,
}: {
  isLogado: boolean;
  onLogout: () => void;
}) {
  return (
    <header className="w-full bg-[#171918] px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link href="/">
        <Image
          src="/LOGO Stock.io.svg"
          alt="Stock.IO"
          width={120}
          height={40}
          className="object-contain"
          priority
        />
      </Link>

      <nav className="flex items-center gap-4">
        {isLogado ? (
          <>
            <Link
              href="/perfil"
              className="text-white hover:text-[#6A38F3] transition-colors"
            >
              <IconePerfil />
            </Link>
            <button
              onClick={onLogout}
              className="text-white hover:text-[#6A38F3] transition-colors bg-transparent border-none cursor-pointer"
            >
              <IconeSair />
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-white text-sm font-medium hover:text-[#6A38F3] transition-colors px-3 py-1"
            >
              LOGIN
            </Link>
            <Link
              href="/cadastro"
              className="bg-[#6A38F3] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#5528d9] transition-colors"
            >
              CADASTRE-SE
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="w-full bg-[#171918] relative overflow-hidden min-h-[220px] md:min-h-[280px] flex items-center">
      <div className="px-8 md:px-14 py-10 z-10 relative">
        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight max-w-[400px]">
          Do CAOS à organização,
          <br />
          em alguns cliques
        </h1>
      </div>

      <div className="absolute right-0 bottom-0 h-full flex items-end pointer-events-none select-none">
        <Image
          src="/Stockles - Mascote da Stock.io.png"
          alt="Mascote Stock.IO"
          width={280}
          height={280}
          className="object-contain object-bottom h-full w-auto max-h-[280px]"
          priority
        />
      </div>
    </section>
  );
}

// ─── SearchBar ────────────────────────────────────────────────────────────────

function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full flex justify-center px-4 -mt-5 relative z-10">
      <div className="w-full max-w-[600px] bg-white rounded-full shadow-md flex items-center px-5 py-3 gap-3">
        <IconeBusca />
        <input
          type="text"
          placeholder="Procure por..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-sm text-[#333] placeholder:text-[#aaa]"
        />
      </div>
    </div>
  );
}

// ─── Categorias ───────────────────────────────────────────────────────────────

function SecaoCategorias() {
  return (
    <section className="px-6 md:px-10 mt-10">
      <h2 className="text-[#111] text-2xl font-semibold mb-5">Categoria</h2>

      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat.label}
            className="flex flex-col items-center gap-2 shrink-0 snap-start group cursor-pointer bg-transparent border-none"
          >
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
              <img
                src={cat.icon}
                alt={cat.label}
                width={32}
                height={32}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <span className="text-xs text-[#444] font-medium">{cat.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ─── Seção Lojas (placeholder) ────────────────────────────────────────────────
// TODO: importar e usar CardLoja quando o componente estiver pronto
// Substituir o conteúdo de <div className="flex gap-5..."> pelos CardLoja mapeados

function SecaoLojas() {
  return (
    <section className="px-6 md:px-10 mt-12 mb-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[#111] text-[30px] font-semibold">Lojas</h2>
        <button className="text-sm text-[#444] border border-[#ccc] rounded-full px-4 py-1.5 flex items-center gap-2 hover:border-[#6A38F3] hover:text-[#6A38F3] transition-colors">
          filtros ▾
        </button>
      </div>

      {/* Substituir pelos CardLoja quando o componente existir */}
      <div className="flex gap-5 overflow-x-auto pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 w-[100px] flex flex-col items-center gap-2 opacity-30"
          >
            <div className="w-16 h-16 rounded-full bg-[#ccc] animate-pulse" />
            <div className="w-14 h-2.5 rounded bg-[#ccc] animate-pulse" />
            <div className="w-10 h-2 rounded bg-[#ccc] animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const produtoService = new ProdutoService();

export default function HomePage() {
  const router = useRouter();
  const { isLogado, carregando, logout } = useAuth();

  const [busca, setBusca] = useState("");

  const [melhoresAvaliados, setMelhoresAvaliados] = useState<Produto[]>([]);
  const [maisBaratos, setMaisBaratos] = useState<Produto[]>([]);
  const [recemAdicionados, setRecemAdicionados] = useState<Produto[]>([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const [avaliados, baratos, recentes] = await Promise.all([
          produtoService.getMelhoresAvaliados(),
          produtoService.getMaisBaratos(),
          produtoService.getRecemAdicionados(),
        ]);
        setMelhoresAvaliados(avaliados);
        setMaisBaratos(baratos);
        setRecemAdicionados(recentes);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoadingProdutos(false);
      }
    }

    carregarProdutos();
  }, []);

  function handleLogout() {
    logout();
    router.push("/");
  }

  function handleProdutoClick(produto: Produto) {
    router.push(`/produto/${produto.id}`);
  }

  // Evita flash enquanto lê o localStorage
  if (carregando) return null;

  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      <Navbar isLogado={isLogado} onLogout={handleLogout} />
      <Hero />
      <SearchBar value={busca} onChange={setBusca} />
      <SecaoCategorias />

      <div className="px-6 md:px-10 mt-10 flex flex-col gap-10">
        {loadingProdutos ? (
          <p className="text-[#888] text-sm animate-pulse">
            Carregando produtos...
          </p>
        ) : (
          <>
            {melhoresAvaliados.length > 0 && (
              <CarrosselCardProdutos
                titulo="Produtos"
                ordenacao="melhores avaliados"
                produtos={melhoresAvaliados}
                onProductClick={handleProdutoClick}
              />
            )}

            {maisBaratos.length > 0 && (
              <CarrosselCardProdutos
                titulo="Produtos"
                ordenacao="mais baratos"
                produtos={maisBaratos}
                onProductClick={handleProdutoClick}
              />
            )}

            {recemAdicionados.length > 0 && (
              <CarrosselCardProdutos
                titulo="Produtos"
                ordenacao="recém adicionados"
                produtos={recemAdicionados}
                onProductClick={handleProdutoClick}
              />
            )}
          </>
        )}
      </div>

      <SecaoLojas />
    </div>
  );
}
