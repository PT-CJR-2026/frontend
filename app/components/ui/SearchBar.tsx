"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Produto } from "@/app/components/ui/CardProduto";
import { ProdutoService } from "@/app/services/ProdutoService";

const produtoService = new ProdutoService();

export default function SearchBar() {
  const [termoBusca, setTermoBusca] = useState("");
  const [sugestoes, setSugestoes] = useState<Produto[]>([]);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const termoLimpo = termoBusca.trim();

    if (!termoLimpo) {
      setSugestoes([]);
      setDropdownAberto(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const resultados = await produtoService.getSugestoes(termoLimpo, 5);
        setSugestoes(resultados);
        setDropdownAberto(true);
      } catch (err) {
        console.error("Erro ao buscar sugestões:", err);
        setSugestoes([]);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [termoBusca]);

  useEffect(() => {
    function handleClickFora(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDropdownAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  function irParaResultados() {
    if (termoBusca.trim() === "") return;
    setDropdownAberto(false);
    router.push(`/busca?q=${encodeURIComponent(termoBusca.trim())}`);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      irParaResultados();
    }
  };

  function handleSugestaoClick(produto: Produto) {
    setDropdownAberto(false);
    router.push(`/produto/${produto.id}`);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-[603px]">
      <div className="relative h-[38px]">
        <input
          type="text"
          placeholder="Procurar por..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => sugestoes.length > 0 && setDropdownAberto(true)}
          className="w-full h-full bg-white rounded-full pl-6 pr-12 text-gray-800 placeholder-[#6A38F380] focus:outline-none focus:ring-2 focus:ring-[#6A38F3] shadow-sm font-sans"
        />

        {/*Ícone de Lupa*/}
        <button
          type="button"
          onClick={irParaResultados}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A78BFA]"
          aria-label="Buscar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown de sugestões */}
      {dropdownAberto && sugestoes.length > 0 && (
        <div className="absolute top-[44px] left-0 w-full bg-white rounded-2xl shadow-lg overflow-hidden z-50">
          {sugestoes.map((produto) => (
            <button
              key={produto.id}
              onClick={() => handleSugestaoClick(produto)}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#F0EAFD] text-left transition"
            >
              {produto.imagem_produto?.[0]?.url_imagem && (
                <img
                  src={produto.imagem_produto[0].url_imagem}
                  alt={produto.nome}
                  className="w-8 h-8 rounded object-cover"
                />
              )}
              <span className="text-sm text-gray-800 truncate">
                {produto.nome}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}