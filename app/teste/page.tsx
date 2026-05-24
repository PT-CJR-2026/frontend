"use client";

import ProductCard from "@/app/components/ui/CardProduto";
import Navbar from "../components/layout/Navbar";

const mockProduto = {
  id: 1,
  loja_id: 1,
  categoria_id: 1,
  nome: "Brownie da CJR",
  preco: "54321.99",
  estoque: 1,
  created_at: new Date(),
  updated_at: new Date(),
  imagem_produto: [
    { id: 1, produto_id: 1, url_imagem: "https://placehold.co/300x300/png", ordem: 1 },
  ],
  loja: { nome: "CJR Confeitaria", logo_url: "https://placehold.co/48x48/png" },
};

export default function TestePage() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#ffffff" }}>
      <Navbar
        logoSrc="/logo-branca-stock.io.svg"
      />

      <div style={{ padding: 32, background: "#e5e5e5", minHeight: "100vh" }}>
        <ProductCard produto={mockProduto} onClick={(p) => console.log(p)} />
      </div>
    </div>
  );
}