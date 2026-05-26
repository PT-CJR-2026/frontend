"use client";

import CardProduto, { Produto } from "@/app/components/ui/CardProduto";

interface CarrosselCardProdutosProps {
  titulo: string;
  ordenacao: string;
  produtos: Produto[];
  onProductClick?: (produto: Produto) => void;
}

export default function CarrosselCardProdutos({
  titulo,
  ordenacao,
  produtos,
  onProductClick,
}: CarrosselCardProdutosProps) {
  return (
    <section className="w-full">
      {/* Cabeçalho */}
      <div className="mb-4 flex items-baseline gap-2.5">
        <h2 className="m-0 text-[30px] font-semibold text-[#111]">
          {titulo}
        </h2>

        {ordenacao && (
          <span className="text-sm font-medium text-[#6A38F3]">
            {ordenacao}
          </span>
        )}
      </div>

      {/* Cards */}
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pt-1 pb-5">
        {produtos.map((produto) => (
          <div key={produto.id} className="shrink-0 snap-start">
            <CardProduto
              produto={produto}
              onClick={onProductClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// mudanças a serem feitas:

// possíveis menlhorias de formatação