import React, { useState } from "react";
import CardProduto from "./CardProduto";
import { Produto } from "./CardProduto";

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
  const produtos_pagina = produtos.slice(15*(paginaAtual-1), 15*paginaAtual);
  const numeroPaginas = Math.ceil( produtos.length / 15);
  

return (
  <div className="flex flex-col min-h-[500px] justify-between w-full">
    <div
        className="grid gap-3 mx-auto"
        style={{ 
          gridTemplateColumns: "repeat(auto-fill, 229px)",
          maxWidth: "calc(5 * 229px + 4 * 12px)"
        }}
      >
      {produtos_pagina.map((produto) => (
        <div key={produto.id} style={{ height: "310px", width: "229px" }}>
          <CardProduto produto={produto} onClick={onProductClick} />
        </div>
      ))}
    </div>
    <div className="flex justify-center mt-4">
      <button
        onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
        disabled={paginaAtual === 1}
        className="text-black p-3 text-2xl">
        {"<"}
      </button>

      {Array.from({ length: numeroPaginas }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`text-black p-3 text-2xl ${page === paginaAtual ? "font-bold" : ""}`}
          onClick={() => setPaginaAtual(page)}>
          {page}
        </button>
      ))}

      <button
        onClick={() => setPaginaAtual((p) => Math.min(numeroPaginas, p + 1))}
        disabled={paginaAtual === numeroPaginas}
        className="text-black p-3 text-2xl">
        {">"}
      </button>
    </div>
  </div>
);
}

