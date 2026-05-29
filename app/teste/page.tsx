"use client";

import CardProduto from "@/app/components/ui/CardProduto";
import CarrosselCardProdutos from "@/app/components/ui/Carrossel";
import Navbar from "../components/layout/Navbar";
import { Produto } from "@/app/components/ui/CardProduto";

// ── Mock data ──────────────────────────────────────────────────────────────

const makeProduto = (
  id: number,
  nome: string,
  preco: string,
  estoque: number,
  loja: string,
  logoUrl: string
): Produto => ({
  id,
  loja_id: 1,
  categoria_id: 1,
  nome,
  preco,
  estoque,
  created_at: new Date(),
  updated_at: new Date(),
  imagem_produto: [
    { id, produto_id: id, url_imagem: "https://placehold.co/300x300/png", ordem: 1 },
  ],
  loja: { nome: loja, logo_url: logoUrl },
});

const mockProdutos: Produto[] = [
  makeProduto(1,  "Brownie CJR",        "54321.99",  5,  "CJR Confeitaria",  "https://placehold.co/48x48/png"),
  makeProduto(2,  "Cookies de Chocolateeeeeeeeeeeeeeeee","29.90",  12, "CJR Confeitaria",  "https://placehold.co/48x48/png"),
  makeProduto(3,  "Bolo Red Velvet",    "89.00",  3,  "Sweet Co.",        "https://placehold.co/48x48/png"),
  makeProduto(4,  "Torta de Limão",     "45.00",  0,  "Sweet Co.",        "https://placehold.co/48x48/png"),
  makeProduto(5,  "Cheesecake",         "62.50",  8,  "Doce Arte",        "https://placehold.co/48x48/png"),
  makeProduto(6,  "Pão de Mel",         "18.00",  20, "Doce Arte",        "https://placehold.co/48x48/png"),
  makeProduto(7,  "Trufa de Maracujá",  "35.00",  15, "Trufas & Cia",    "https://placehold.co/48x48/png"),
  makeProduto(8,  "Eclair de Baunilha", "22.90",  6,  "Trufas & Cia",    "https://placehold.co/48x48/png"),
  makeProduto(9,  "Macaron",            "12.00",  30, "Pâtisserie BR",   "https://placehold.co/48x48/png"),
  makeProduto(10, "Croissant",          "9.90",   25, "Pâtisserie BR",   "https://placehold.co/48x48/png"),
];

export default function TestePage() {
  return (
    <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f0ede4" }}>
      <Navbar logoSrc="/logo-branca-stock.io.svg" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Card isolado */}
        <section>
          <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Card isolado
          </h3>
          <CardProduto
            produto={mockProdutos[0]}
            onClick={(p) => console.log("card clicado:", p)}
          />
        </section>

        {/* Carrossel - melhores avaliados */}
        <CarrosselCardProdutos
          titulo="Produtos"
          ordenacao="melhores avaliados"
          produtos={mockProdutos}
          onProductClick={(p) => console.log("carrossel clicado:", p)}
        />

        {/* Carrossel - em promoção */}
        <CarrosselCardProdutos
          titulo="Promoções"
          ordenacao="menor preço"
          produtos={[...mockProdutos].reverse()}
          onProductClick={(p) => console.log("promoção clicada:", p)}
        />

      </div>

      <div className= "h-16" />

    </div>
  );
}

// Creditos ao Claude por ter gerado os cards para teste