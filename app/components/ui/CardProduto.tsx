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

interface ProductCardProps {
  produto: Produto;
  onClick?: (produto: Produto) => void;
}

const PLACEHOLDER_PRODUCT =
  "https://placehold.co/300x300/f5f5f5/aaa?text=Produto";
const PLACEHOLDER_LOGO = "https://placehold.co/48x48/f5f5f5/aaa?text=Loja";

export default function ProductCard({ produto, onClick }: ProductCardProps) {
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
      style={{
        background: "#ffffff",
        borderRadius: 35,
        width: 228.68,
        height: 310,
        display: "flex",
        flexDirection: "column",
        cursor: onClick ? "pointer" : "default",
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.15s ease",
        userSelect: "none",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (onClick)
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 4px 12px rgba(0,0,0,0.13)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 1px 4px rgba(0,0,0,0.07)";
      }}
    >
      {/* Imagem */}
      <div
        style={{
          position: "relative",
          margin: "12px 19px 0",
          borderRadius: 12.81,
          width: 190.24,
          height: 190.24,
          flexShrink: 0,
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        <Image
          src={imagemSrc}
          alt={produto.nome}
          fill
          style={{ objectFit: "contain" }}
          onError={() => setImgError(true)}
          priority
          unoptimized={imgError}
        />

        {/* Logo da loja */}
        <div
          style={{
            position: "relative",
            left: 135,
            top: 8,
            width: 40,
            height: 40,
            borderRadius: "50%",
            overflow: "hidden",
            background: "#ffffff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            flexShrink: 0,
          }}
        >
          <Image
            src={logoSrc}
            alt={produto.loja?.nome ?? "Loja"}
            fill
            sizes="40px"
            style={{ objectFit: "contain" }}
            onError={() => setLogoError(true)}
            unoptimized={logoError}
          />
        </div>
      </div>

      {/* Textos */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "10px 22px 14px",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {/* Nome do produto */}
        <p
          style={{
            margin: 0,
            fontSize: 19,
            fontWeight: 500,
            color: "#1a1a1a",
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {produto.nome}
        </p>

        {/* Preço */}
        <p
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 700,
            color: "#1a1a1a",
          }}
        >
          {precoFormatado}
        </p>

        {/* Disponibilidade */}
        <p
          style={{
            margin: 0,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: disponivel ? "#19c257" : "#AF052A",
          }}
        >
          {disponivel ? "DISPONÍVEL" : "INDISPONÍVEL"}
        </p>
      </div>
    </article>
  );
}