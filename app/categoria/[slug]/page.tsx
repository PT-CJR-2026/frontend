"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CarrosselCardProdutos from "@/app/components/ui/CarrosselProduto";
import SearchBar from "@/app/components/ui/SearchBar";
import Navbar from "@/app/components/layout/Navbar";
import Hero from "@/app/components/layout/Hero";
import IndicePagina from "@/app/components/ui/IndicePaginas";
import { Produto } from "@/app/components/ui/CardProduto";
import { ProdutoService } from "@/app/services/ProdutoService";
import { axiosInstance } from "@/app/services/BaseService";
import CarrosselLoja from "@/app/components/ui/CarrosselLoja";
import { Loja } from "@/app/components/ui/CardLoja";
import { FiltroCategorias } from "@/app/components/ui/FiltroCategorias";

const produtoService = new ProdutoService();

export default function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtosExibidos, setProdutosExibidos] = useState<Produto[]>([]);
  const [maisBaratos, setMaisBaratos] = useState<Produto[]>([]);
  const [recemAdicionados, setRecemAdicionados] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [nomeCategoria, setNomeCategoria] = useState(slug);
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [ordenacao, setOrdenacao] = useState<string>('padrao');
  const [subcategorias, setSubcategorias] = useState<string[]>([]);
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState<string | null>(null);
  const [subcategoriasMap, setSubcategoriasMap] = useState<{ id: number; nome: string }[]>([]);

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

          // Subcategorias — reutiliza o mesmo resultado de /categoria
          const subsCompletas = categorias.filter(
            (c: { id: number; nome: string; categoria_pai_id: number | null }) =>
              c.categoria_pai_id === categoria.id
          );
          setSubcategoriasMap(subsCompletas);
          setSubcategorias(subsCompletas.map((c: { nome: string }) => c.nome));

          // Produtos
          const produtosFiltrados = await produtoService.getPorCategoria(categoria.id);
          setProdutos(produtosFiltrados);
          setProdutosExibidos(produtosFiltrados);

          setMaisBaratos(
            [...produtosFiltrados].sort(
              (a, b) => parseFloat(String(a.preco)) - parseFloat(String(b.preco))
            )
          );

          setRecemAdicionados(
            [...produtosFiltrados].sort(
              (a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )
          );

          // Lojas
          const { data: lojasData } = await axiosInstance.get(`/lojas/categoria/${categoria.id}`);
          setLojas(lojasData);

        } else {
          const todos = await produtoService.getMelhoresAvaliados();
          setProdutos(todos);
          setProdutosExibidos(todos);
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

  // Filtra produtos ao selecionar subcategoria
  useEffect(() => {
    if (!subcategoriaSelecionada) {
      setProdutosExibidos(produtos);
      return;
    }

    const subSelecionada = subcategoriasMap.find(s => s.nome === subcategoriaSelecionada);
    if (!subSelecionada) return;

    const filtrados = produtos.filter(p => p.categoria_id === subSelecionada.id);
    setProdutosExibidos(filtrados);
  }, [subcategoriaSelecionada, produtos, subcategoriasMap]);

  function handleProdutoClick(produto: Produto) {
    router.push(`/produto/${produto.id}`);
  }

  function handleOrdenacao(id: string) {
  const novaOrdenacao = ordenacao === id ? 'padrao' : id;
  setOrdenacao(novaOrdenacao);

  const baseFiltrada = subcategoriaSelecionada
    ? produtos.filter(p => {
        const sub = subcategoriasMap.find(s => s.nome === subcategoriaSelecionada);
        return sub && p.categoria_id === sub.id;
      })
    : produtos;

  if (novaOrdenacao === 'preco') {
    setProdutosExibidos([...baseFiltrada].sort((a, b) =>
      parseFloat(String(a.preco)) - parseFloat(String(b.preco))
    ));
  } else if (novaOrdenacao === 'recente') {
    setProdutosExibidos([...baseFiltrada].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ));
  } else {
    setProdutosExibidos(baseFiltrada);
  }
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

      {/* SearchBar centralizada */}
      <div className="flex justify-end px-6 md:px-10 mt-4">
        <SearchBar />
      </div>

      {/* Subcategorias + Ordenar por */}
      <div className="flex items-center justify-between px-6 md:px-10 mt-4 gap-4">
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

        <FiltroCategorias
          titulo="ordenar por"
          opcoes={[
            { id: 'padrao', label: 'Padrão' },
            { id: 'preco', label: 'Preço' },
            { id: 'recente', label: 'Mais Recente' },
          ]}
          categoriasSelecionadas={[ordenacao]}
          onToggleCategoria={handleOrdenacao}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <p className="text-[#888] text-sm animate-pulse px-6 md:px-10">Carregando produtos...</p>
        ) : (
          <>
            <IndicePagina
              titulo={nomeCategoria}
              produtos={produtosExibidos}
              onProductClick={handleProdutoClick}
            />

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