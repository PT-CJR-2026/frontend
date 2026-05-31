"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Hero from "@/app/components/layout/Hero";
import Navbar from "@/app/components/layout/Navbar";
import SearchBar from "@/app/components/ui/SearchBar";
import CarrosselCardProdutos from "@/app/components/ui/Carrossel";
import { Produto } from "@/app/components/ui/CardProduto";
import { ProdutoService } from "@/app/services/ProdutoService";

// ─── Importando os seus componentes ───────────────────────────────────────────
import CarrosselCategoria from "@/app/components/ui/CarrosselCategoria";
import CarrosselLoja from "@/app/components/ui/CarrosselLoja";
import { FiltroCategorias } from "@/app/components/ui/FiltroCategorias";
import { Loja } from "./components/ui/CardLoja";

// ─── Lojas Mockadas (Temporário para a Review) ────────────────────────────────
const MOCK_LOJAS: Loja[] = [
  { id: 1, nome: "CJR", categoria: "mercado", logoUrl: "/logosLojas/LogoCJR.png" },
  { id: 2, nome: "Rare Beauty", categoria: "beleza", logoUrl: "/logosLojas/LogoRareB.png" },
  { id: 3, nome: "The Croc Brew", categoria: "mercado", logoUrl: "/logosLojas/LogoCrocB.png" },
  { id: 4, nome: "Mini Reno", categoria: "casa", logoUrl: "/logosLojas/LogoMiniReno.png" },
  { id: 5, nome: "amoca", categoria: "moda", logoUrl: "/logosLojas/LogoAmoca.png" },
  { id: 6, nome: "Repiit", categoria: "eletrônicos", logoUrl: "/logosLojas/LogoRepiit.png" },
  { id: 7, nome: "Creamy Skincare", categoria: "beleza", logoUrl: "/logosLojas/LogoCreamy.png" },
  { id: 8, nome: "Maumar", categoria: "mercado", logoUrl: "/logosLojas/LogoMaumar.png" },
  { id: 9, nome: "SneakerStore", categoria: "moda", logoUrl: "/logosLojas/LogoSneacker.png" },
  { id: 10, nome: "Melina Couture", categoria: "moda", logoUrl: "/logosLojas/LogoMelina.png" },
  { id: 11, nome: "d'carts & baskets", categoria: "mercado", logoUrl: "/logosLojas/LogoBasckets.png" },
  { id: 12, nome: "Fluffy House", categoria: "casa", logoUrl: "/logosLojas/LogoFluffy.png" },
  { id: 13, nome: "electree", categoria: "eletrônicos", logoUrl: "/logosLojas/LogoElectree.png" },
  { id: 14, nome: "Roots", categoria: "beleza", logoUrl: "/logosLojas/LogoRoots.png" },
];


// ─── Seção Categorias ─────────────────────────────────────────────────────────

function SecaoCategorias() {
  return (
    <section className="px-6 md:px-10 mt-10">
      {/* O seu componente substitui o HTML antigo, já trazendo o título internamente */}
      <CarrosselCategoria titulo="Categoria" />
    </section>
  );
}

// ─── Seção Lojas ──────────────────────────────────────────────────────────────

// Adicionamos as propriedades (props) para receber os dados filtrados e as funções da HomePage
function SecaoLojas({ lojasFiltradas, categoriasMarcadas, onToggleCategoria }: any) {
  return (
    <section className="px-6 md:px-10 mt-12 mb-10">
      <CarrosselLoja 
        titulo="Lojas" 
        Lojas={lojasFiltradas} 
        acaoCabecalho={
          <FiltroCategorias 
            categoriasSelecionadas={categoriasMarcadas}
            onToggleCategoria={onToggleCategoria}
          />
        }
      />
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

  // Estado do Filtro
  const [categoriasMarcadas, setCategoriasMarcadas] = useState<string[]>([]);

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

  // Lógica de gerenciar as categorias ativas
  const toggleCategoria = (categoriaId: string) => {
    if (categoriasMarcadas.includes(categoriaId)) {
      setCategoriasMarcadas(categoriasMarcadas.filter(id => id !== categoriaId));
    } else {
      setCategoriasMarcadas([...categoriasMarcadas, categoriaId]);
    }
  };

  // Simulação do backend
  const lojasFiltradas = categoriasMarcadas.length === 0
    ? MOCK_LOJAS
    : MOCK_LOJAS.filter(loja => categoriasMarcadas.includes(loja.categoria));

  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      {/* Navbar — já lida com logado/deslogado internamente */}
      <Navbar logoSrc="/logo-branca-stock.io.svg" logoAlt="Stock.IO" />

      {/* Hero — usa slug "home" */}
      <Hero slug="home" />

      {/* SearchBar */}
      <div className="flex justify-end px-6 md:px-10 mt-4">
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

      {/* Lojas - Passando os dados e funções via props para manter o isolamento */}
      <SecaoLojas 
        lojasFiltradas={lojasFiltradas}
        categoriasMarcadas={categoriasMarcadas}
        onToggleCategoria={toggleCategoria}
      />
    </div>
  );
}