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

  return (
    <div className="grid grid-cols-5 grid-rows-3">
        {produtos_pagina.map((produtos_pagina) => (
          <div key={produtos_pagina.id} style={{ height: "310px", width: "229px" }}>
            <CardProduto produto={produtos_pagina} onClick={onProductClick} />
          </div>
        ))}
      </div>
  );
}

