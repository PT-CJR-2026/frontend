"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// imports de components
import CarrosselCategoria from "@/app/components/ui/CarrosselCategoria";
import CarrosselLoja from "@/app/components/ui/CarrosselLoja";
import { FiltroCategorias } from "@/app/components/ui/FiltroCategorias";
import { Loja } from "./components/ui/CardLoja";
import Hero from "@/app/components/layout/Hero";
import Navbar from "@/app/components/layout/Navbar";
import SearchBar from "@/app/components/ui/SearchBar";
import CarrosselCardProdutos from "@/app/components/ui/CarrosselProduto";
import { Produto } from "@/app/components/ui/CardProduto";
import { Categoria } from "@/app/components/ui/CarrosselCategoria";

// imports de serviços
import { LojasService } from "./services/LojasService";
import { ProdutoService } from "@/app/services/ProdutoService";

const produtoService = new ProdutoService();
const lojaService = new LojasService(); 

export default function HomePage() {
  const router = useRouter();

  // estados de produtos
  const [melhoresAvaliados, setMelhoresAvaliados] = useState<Produto[]>([]);
  const [maisBaratos, setMaisBaratos] = useState<Produto[]>([]);
  const [recemAdicionados, setRecemAdicionados] = useState<Produto[]>([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);

  // estados de loja e filtro
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [loadingLojas, setLoadingLojas] = useState(true);
  const [categoriasMarcadas, setCategoriasMarcadas] = useState<string[]>([]);

  // lógica do botão do filtro
  const toggleCategoria = (categoriaId: string) => {
    if (categoriasMarcadas.includes(categoriaId)) {
      setCategoriasMarcadas(categoriasMarcadas.filter(id => id !== categoriaId));
    } else {
      setCategoriasMarcadas([...categoriasMarcadas, categoriaId]);
    }
  };

  // efeito de produtos (carrossel)
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

  // efeito das lojas (carrossel)
  useEffect(() => {
    async function carregarLojas() {
      setLoadingLojas(true);
      try {
        const lojasData = await lojaService.getLojas(categoriasMarcadas);
        setLojas(lojasData);
      } catch (err) {
        console.error("Erro ao carregar lojas da API:", err);
      } finally {
        setLoadingLojas(false);
      }
    }
    carregarLojas();
  }, [categoriasMarcadas]);

  // funções de clique
  function handleProdutoClick(produto: Produto) {
    router.push(`/produto/${produto.id}`);
  }

  function handleLojaClick(loja: Loja) {
    console.log(`Página da loja ${loja.nome} em desenvolvimento.`);
    router.push(`/loja/${loja.id}`);
  }

  function handleCategoriaClick(categoria: Categoria) {
  const slug = categoria.titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  router.push(`/categoria/${slug}`);
}

  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      {/* Navbar e Hero */}
      <Navbar logoSrc="/logo-branca-stock.io.svg" logoAlt="Stock.IO" />
      <Hero slug="home" />

      {/* SearchBar */}
      <div className="flex justify-end px-6 md:px-10 mt-4">
        <SearchBar />
      </div>

      {/* Categorias */}
      <div className="px-6 md:px-10 mt-10">
        <CarrosselCategoria titulo="Categoria" onCategoriaClick={handleCategoriaClick} />
      </div>

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

      {/* Lojas + Filtro integrados à API */}
      <div className="px-6 md:px-10 mt-12 mb-10 min-h-[200px]">
        {loadingLojas ? (
           <p className="text-[#888] text-sm animate-pulse">Carregando lojas...</p>
        ) : (
          <CarrosselLoja 
            titulo="Lojas" 
            Lojas={lojas} 
            onLojaClick={handleLojaClick}
            acaoCabecalho={
              <FiltroCategorias 
                categoriasSelecionadas={categoriasMarcadas}
                onToggleCategoria={toggleCategoria}
              />
            }
          />
        )}
      </div>
    </div>
  );
}