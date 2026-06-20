"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "@/app/components/ui/SearchBar";
import Navbar from "@/app/components/layout/Navbar";
import CardProduto, { Produto } from "@/app/components/ui/CardProduto";
import { ProdutoService } from "@/app/services/ProdutoService";

const produtoService = new ProdutoService();

function BuscaConteudo() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const termo = searchParams.get("q") ?? "";

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      if (!termo.trim()) {
        setProdutos([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const resultados = await produtoService.getByTermo(termo);
        if (!ativo) return;
        setProdutos(resultados);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        if (ativo) setProdutos([]);
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [termo]);

  function handleProdutoClick(produto: Produto) {
    router.push(`/produto/${produto.id}`);
  }

  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      <Navbar logoSrc="/logo-branca-stock.io.svg" />

      <div className="flex justify-end px-6 md:px-10 mt-4">
        <SearchBar />
      </div>

      <div className="px-6 md:px-10 mt-8 mb-10">
        <h1
          className="text-[#222] text-[26px] mb-6"
          style={{ fontFamily: "'League Spartan', sans-serif" }}
        >
          {termo ? `Resultados para "${termo}"` : "Digite algo para buscar"}
        </h1>

        {loading ? (
          <p className="text-[#888] text-sm animate-pulse">Buscando produtos...</p>
        ) : produtos.length === 0 && termo ? (
          <p className="text-[#888] text-sm">
            Nenhum produto encontrado para &quot;{termo}&quot;.
          </p>
        ) : (
          <div className="flex flex-wrap gap-5">
            {produtos.map((produto) => (
              <CardProduto
                key={produto.id}
                produto={produto}
                onClick={handleProdutoClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BuscaPage() {
  return (
    <Suspense fallback={null}>
      <BuscaConteudo />
    </Suspense>
  );
}