"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagemProduto } from "../ui/CardProduto";

const PLACEHOLDER_PRODUCT =
  "https://placehold.co/600x600/f5f5f5/aaa?text=Produto";

interface GaleriaProdutoProps {
  nome: string;
  imagens: ImagemProduto[];
}

export default function GaleriaProduto({ nome, imagens }: GaleriaProdutoProps) {
  const imagensOrdenadas = [...(imagens ?? [])].sort((a, b) => a.ordem - b.ordem);
  const [indiceAtivo, setIndiceAtivo] = useState(0);

  const imagemAtiva =
    imagensOrdenadas[indiceAtivo]?.url_imagem ?? PLACEHOLDER_PRODUCT;

  if (imagensOrdenadas.length === 0) {
    return (
      <div className="flex gap-4">
        <div className="relative w-full max-w-[550px] aspect-square rounded-[28px] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.07)] overflow-hidden">
          <Image
            src={PLACEHOLDER_PRODUCT}
            alt={nome}
            fill
            className="object-contain p-8"
            unoptimized
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {/* Miniaturas */}
      <div className="flex flex-col gap-3 w-[130px] shrink-0">
        {imagensOrdenadas.map((img, idx) => (
          <button
            key={img.id ?? idx}
            type="button"
            onClick={() => setIndiceAtivo(idx)}
            className={[
              "relative w-full aspect-square rounded-2xl overflow-hidden bg-white shrink-0",
              "shadow-[0_1px_4px_rgba(0,0,0,0.07)] transition-all duration-150",
              idx === indiceAtivo
                ? "ring-2 ring-[#6A38F3]"
                : "ring-1 ring-black/5 hover:ring-black/15",
            ].join(" ")}
          >
            <Image
              src={img.url_imagem}
              alt={`${nome} - imagem ${idx + 1}`}
              fill
              className="object-contain p-2"
              unoptimized
            />
          </button>
        ))}
      </div>

      {/* Imagem principal */}
      <div className="relative flex-1 max-w-[550px] aspect-square rounded-[28px] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.07)] overflow-hidden">
        <Image
          src={imagemAtiva}
          alt={nome}
          fill
          className="object-contain p-10"
          unoptimized
          priority
        />
      </div>
    </div>
  );
}