"use client";

import { useState } from "react";
import Image from "next/image";

export interface ImagemProduto {
  id: number;
  produto_id: number;
  url_imagem: string;
  ordem: number;
}

export interface Produto {
  id: number;
  loja_id: number;
  categoria_id: number;
  nome: string;
  descricao?: string | null;
  preco: number | string;
  estoque: number;
  created_at: Date | string;
  updated_at: Date | string;
  imagem_produto: ImagemProduto[];
  loja?: {
    nome: string;
    logo_url?: string | null;
  };
}

export interface CardProdutoProps {
  produto: Produto;
  onClick?: (produto: Produto) => void;
}

const PLACEHOLDER_PRODUCT =
  "https://placehold.co/300x300/f5f5f5/aaa?text=Produto";
const PLACEHOLDER_LOGO = "https://placehold.co/48x48/f5f5f5/aaa?text=Loja";

export default function CardProduto({ produto, onClick }: CardProdutoProps) {
  const imagens = [...(produto.imagem_produto ?? [])].sort(
    (a, b) => a.ordem - b.ordem
  );

  const [imgError, setImgError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const imagemSrc =
    imagens.length > 0 && !imgError
      ? imagens[0].url_imagem
      : PLACEHOLDER_PRODUCT;

  const logoSrc =
    produto.loja?.logo_url && !logoError
      ? produto.loja.logo_url
      : PLACEHOLDER_LOGO;

  const preco = parseFloat(String(produto.preco));
  const precoFormatado = preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const disponivel = produto.estoque > 0;

  return (
    <article
      onClick={() => onClick?.(produto)}
      className={[
        "bg-white rounded-[35px] w-[228.68px] h-[310px]",
        "flex flex-col overflow-hidden select-none",
        "shadow-[0_1px_4px_rgba(0,0,0,0.07)]",
        "transition-shadow duration-150 ease-in",
        onClick ? "cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.13)]" : "cursor-default",
      ].join(" ")}
    >
      {/* Imagem */}
      <div
        className="relative mx-[19px] mt-3 rounded-[12.81px] w-[190.24px] h-[190.24px] shrink-0 overflow-hidden bg-white"
      >
        <Image
          src={imagemSrc}
          alt={produto.nome}
          draggable={false}
          fill
          className="object-contain"
          onError={() => setImgError(true)}
          priority
          unoptimized={imgError}
        />

        {/* Logo da loja */}
        <div
          className="absolute left-[135px] top-2 w-10 h-10 rounded-full overflow-hidden bg-white shadow-[0_1px_4px_rgba(0,0,0,0.15)] shrink-0"
        >
          <Image
            src={logoSrc}
            alt={produto.loja?.nome ?? "Loja"}
            draggable={false}
            fill
            sizes="40px"
            className="object-contain"
            onError={() => setLogoError(true)}
            unoptimized={logoError}
          />
        </div>
      </div>

      {/* Textos */}
      <div className="flex flex-col flex-1 px-[22px] pb-[14px] pt-[10px] gap-1 justify-center">
        {/* Nome do produto */}
        <p className="m-0 text-[17px] font-medium text-[#1a1a1a] leading-[1.3] line-clamp-2">
          {produto.nome.length > 20 ? produto.nome.slice(0, 20) + "…" : produto.nome}
        </p>

        {/* Preço */}
        <p className="m-0 text-base font-bold text-[#1a1a1a]">
          {precoFormatado}
        </p>

        {/* Disponibilidade */}
        <p
          className={`m-0 text-xs font-semibold tracking-[0.06em] ${
            disponivel ? "text-[#19c257]" : "text-[#AF052A]"
          }`}
        >
          {disponivel ? "DISPONÍVEL" : "INDISPONÍVEL"}
        </p>
      </div>
    </article>
  );
}