"use client";

import { CardCategoria } from "./CardCategoria";

export interface Categoria {
  id: number;
  titulo: string;
  iconeSrc: string;
}

const CATEGORIA: Categoria[] = [
  { id: 1, titulo: "Mercado", iconeSrc: "/categoriaMercado.svg" },
  { id: 2, titulo: "Farmácia", iconeSrc: "/categoriaFarmacia.svg" },
  { id: 3, titulo: "Beleza", iconeSrc: "/categoriaBeleza.svg" },
  { id: 4, titulo: "Moda", iconeSrc: "/categoriaModa.svg" },
  { id: 5, titulo: "Eletrônicos", iconeSrc: "/categoriaEletronicos.svg" },
  { id: 6, titulo: "jogos", iconeSrc: "/categoriaJogos.svg" },
  { id: 7, titulo: "Brinquedos", iconeSrc: "/categoriaBrinquedos.svg" },
  { id: 8, titulo: "Casa", iconeSrc: "/categoriaCasa.svg" },
];

interface CarrosselCategoriaProps {
  titulo?: string;
  onCategoriaClick?: (categoria: Categoria) => void;
}

export default function CarrosselCategoria({
  titulo,
  onCategoriaClick,
}: CarrosselCategoriaProps) {
  return (
    <section className="w-full">
      {/* título */}
      {titulo && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
            {titulo}
          </h2>
        </div>
      )}

      {/* Container do Carrossel */}
      <div 
        className="flex snap-x snap-mandatory gap-12 overflow-x-auto py-2 pl-1 
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {/* constante fixa para renderizar os cards */}
        {CATEGORIA.map((categoria) => (
          <div key={categoria.id} className="shrink-0 snap-start">
            <CardCategoria
              titulo={categoria.titulo}
              iconeSrc={categoria.iconeSrc}
              onClick={() => onCategoriaClick?.(categoria)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}