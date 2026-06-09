"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CarrosselCardProdutos from "@/app/components/ui/Carrossel";
import SearchBar from "@/app/components/ui/SearchBar";
import Navbar from "@/app/components/layout/Navbar";
import Hero from "@/app/components/layout/Hero";
import IndicePagina from "@/app/components/ui/IndicePaginas";
import { ImagemProduto, Produto } from "@/app/components/ui/CardProduto";
import { ProdutoService } from "@/app/services/ProdutoService";
import { axiosInstance } from "@/app/services/BaseService";
import CarrosselLoja from "@/app/components/ui/CarrosselLoja";
import { Loja } from "@/app/components/ui/CardLoja";

const produtoService = new ProdutoService();
const categoriasMarcadas: string[] = [];

{/*Mock subcategorias*/}
const MOCK_SUBCATEGORIAS = [
  { produtoId: 1, subcategoria: "Celulares" },
  { produtoId: 2, subcategoria: "Celulares" },
  { produtoId: 3, subcategoria: "Notebooks" },
  { produtoId: 4, subcategoria: "TVs" },
];

function SecaoLojas() {
  return (
    <section className="px-6 md:px-10 mt-12 mb-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[#111] text-[30px] font-semibold">Lojas</h2>
        <button className="text-sm text-[#444] border border-[#ccc] rounded-full px-4 py-1.5 flex items-center gap-2 hover:border-[#6A38F3] hover:text-[#6A38F3] transition-colors">
          filtros ▾
        </button>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="shrink-0 w-[100px] flex flex-col items-center gap-2 opacity-30">
            <div className="w-16 h-16 rounded-full bg-[#ccc] animate-pulse" />
            <div className="w-14 h-2.5 rounded bg-[#ccc] animate-pulse" />
            <div className="w-10 h-2 rounded bg-[#ccc] animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [maisBaratos, setMaisBaratos] = useState<Produto[]>([]);
  const [recemAdicionados, setRecemAdicionados] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [nomeCategoria, setNomeCategoria] = useState(slug);
  const [lojas, setLojas] = useState<Loja[]>([]);
  const subcategorias = [
    ...new Set(MOCK_SUBCATEGORIAS.map(item => item.subcategoria))
  ];
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] =
  useState<string | null>(null);

 useEffect(() => {
  async function carregar() {
    try {
      const { data: categorias } = await axiosInstance.get("/categoria");

      const categoria = categorias.find(
        (c: { id: number; nome: string }) =>
          c.nome
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-") === slug
      );

      if (categoria) {
        setNomeCategoria(categoria.nome);

        const produtosFiltrados = await produtoService.getPorCategoria(
          categoria.id
        );

        setProdutos(produtosFiltrados);

        setMaisBaratos(
          [...produtosFiltrados].sort(
            (a, b) =>
              parseFloat(String(a.preco)) -
              parseFloat(String(b.preco))
          )
        );

        setRecemAdicionados(
          [...produtosFiltrados].sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
        );
        console.log("categoria id:", categoria.id);
        const { data: lojasData } = await axiosInstance.get(`/lojas/categoria/${categoria.id}`);
        setLojas(lojasData);
      } else {
        const todos = await produtoService.getMelhoresAvaliados();

        setProdutos(todos);
        setMaisBaratos(todos);
        setRecemAdicionados(todos);
      }
    } catch (err) {
      console.error("Erro ao carregar:", err);
    } finally {
      setLoading(false);
    }
  }

  carregar();
}, [slug]);

  function handleProdutoClick(produto: Produto) {
    router.push(`/produto/${produto.id}`);
  }
  

  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      <Navbar logoSrc="/logo-branca-stock.io.svg" />

      <Hero
        tituloLinha1="O universo da tecnologia "
        tituloLinha2="em um só lugar"
        imagemSrc="/mascote-hero 2.png"
        imagemAlt="Descrição do novo mascote"
      />

      <div className="flex justify-end px-6 md:px-10 mt-4">
        <SearchBar />
      </div>

  <div className="px-6 md:px-10 mt-4">
    <div className="flex gap-4 overflow-x-auto pb-2">
      {subcategorias.map((subcategoria) => (
        <button
          key={subcategoria}
          onClick={() =>
            setSubcategoriaSelecionada(prev =>
              prev === subcategoria ? null : subcategoria
            )
          }
          className={`
            whitespace-nowrap px-6 py-2 rounded-full text-sm shadow-sm transition
            ${subcategoriaSelecionada === subcategoria
              ? "bg-[#6A38F3] text-white"
              : "bg-white text-[#6A38F380] hover:bg-[#F0EAFD]"
            }
          `}
        >
          {subcategoria}
        </button>
        ))}
        </div>
    </div>

      <div className="mt-10">
        {loading ? (
          <p className="text-[#888] text-sm animate-pulse px-6 md:px-10">Carregando produtos...</p>
        ) : (
          <>
            <IndicePagina titulo={nomeCategoria} produtos={produtos} />

            <div className="mt-10 flex flex-col gap-10 px-6 md:px-10">
              {maisBaratos.length > 0 && (
                <CarrosselCardProdutos
                  titulo="Mais baratos"
                  ordenacao="menor preço"
                  produtos={maisBaratos}
                  onProductClick={handleProdutoClick}
                />
              )}
              {recemAdicionados.length > 0 && (
                <CarrosselCardProdutos
                  titulo="Recém adicionados"
                  ordenacao="recém adicionados"
                  produtos={recemAdicionados}
                  onProductClick={handleProdutoClick}
                />
              )}
            </div>
          </>
        )}
      </div>

      <div className="bg-black px-10 py-8">
      <h2
        className="text-white text-[30px] mb-6"
        style={{ fontFamily: "'League Spartan', sans-serif" }}
      >
        Principais Lojas
      </h2>

      <CarrosselLoja Lojas={lojas} />
    </div>
    </div>
  );
}
