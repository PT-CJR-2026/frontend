"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Hero from "@/app/components/layout/Hero";
import Navbar from "@/app/components/layout/Navbar";
import SearchBar from "@/app/components/ui/SearchBar";
import CarrosselCardProdutos from "@/app/components/ui/Carrossel";
import { Produto } from "@/app/components/ui/CardProduto";
import { ProdutoService } from "@/app/services/ProdutoService";

// ─── Categorias (estáticas) ───────────────────────────────────────────────────

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

// ─── Seção Categorias ─────────────────────────────────────────────────────────

function SecaoCategorias() {
  return (
    <section className="px-6 md:px-10 mt-10">
      <h2 className="text-[#111] text-2xl font-semibold mb-5">Categoria</h2>

      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat.label}
            className="flex flex-col items-center gap-2 shrink-0 snap-start cursor-pointer bg-transparent border-none"
          >
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center hover:shadow-md transition-shadow">
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
// TODO: importar CardLoja e LojaService quando o componente estiver pronto
// Substituir o conteúdo do flex abaixo por lojas.map((loja) => <CardLoja key={loja.id} loja={loja} />)

function SecaoLojas() {
  return (
    <section className="px-6 md:px-10 mt-12 mb-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[#111] text-[30px] font-semibold">Lojas</h2>

        {/*espaço para o botão de filtros, para quando tiver implementado,
        só colocar:   <button onClick={() => abrirFiltro()} ...> */}
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

  function handleProdutoClick(produto: Produto) {
    router.push(`/produto/${produto.id}`);
  }

  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      {/* Navbar — já lida com logado/deslogado internamente */}
      <Navbar logoSrc="/logo-branca-stock.io.svg" logoAlt="Stock.IO" />

      {/* Hero — usa slug "home" */}
      <Hero slug="home" />

      {/* SearchBar — centralizada abaixo do hero */}
      <div className="w-full flex justify-center px-4 mt-6">
        <SearchBar />
      </div>

      {/* Categorias */}
      <SecaoCategorias />

      {/* Carrosseis de Produtos */}
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

      {/* Lojas */}
      <SecaoLojas />
    </div>
  );
}
