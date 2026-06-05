"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CardProduto, { Produto } from "./CardProduto";

export interface IndicePagina {
    titulo: string;
    produtos: Produto[];
    onProductClick?: (produto: Produto) => void;
}

export default function IndicePagina({
  titulo,
  produtos,
  onProductClick,
}: IndicePagina) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const router = useRouter();
  const produtos_pagina = produtos.slice(15*(paginaAtual-1), 15*paginaAtual);
  const numeroPaginas = Math.ceil( produtos.length / 15);
  

  const handleProdutoClick = (produto: Produto) => {
  router.push(`/produto/${produto.id}`);
  };

  return (
    <>
    {/*Grid dos produtos*/}
      <div className="flex justify-center px-4">
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(5, 229px)", 
        gap: "20px",
        maxWidth: "1300px",
        width: "100%"
      }}>
          {produtos_pagina.map((produto) => (
            <div
              key={produto.id}
              className="flex justify-center"
            >
              <CardProduto
                produto={produto}
                onClick={onProductClick ?? handleProdutoClick}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {/*Botão que passa para trás*/}
        <button
          onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
          disabled={paginaAtual === 1}
          className="text-black p-3 text-2xl">
          {"<"}
        </button>
        {/*Varredura das páginas*/}
        {Array.from({ length: numeroPaginas }, (_, i) => i + 1).map((page) => (
          <button className={`text-black p-3 text-2xl ${page === paginaAtual ? "font-bold" : ""}`}key={page} onClick={() => setPaginaAtual(page)}>
            {page}
          </button>
        ))}
        {/*Botão que passa para frente*/}
        <button
          onClick={() => setPaginaAtual((p) => Math.min(numeroPaginas, p + 1))}
          disabled={paginaAtual === numeroPaginas}
          className="text-black p-3 text-2xl">
          {">"}
        </button>
      </div>
    </>
  );
}

