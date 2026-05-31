'use client';
import { useState } from "react";
import CriaProduto from "../produto/modal-cria-produto";
import EditaProduto from "../produto/modal-edita-produto";
import CardProduto from "@/app/components/ui/CardProduto";
import CarrosselCardProdutos from "@/app/components/ui/Carrossel";
import Navbar from "../components/layout/Navbar";
import { Produto } from "@/app/components/ui/CardProduto";
import IndicePagina from "../components/ui/IndicePaginas";

// ── Mock data ──────────────────────────────────────────────────────────────

const produtoMock = {
  id: 1,
  nome: "Produto Teste",
  descricao: "Essa descricao absurdamentde grande de teste para ativar a rolaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaagem",
  preco: 99.90,
  estoque: 10,
  subcategoria: "1",
  imagens: [],
};

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
  makeProduto(11, "Alfajor",          "3.30",   15, "Trufas & Cia",   "https://placehold.co/48x48/png"),
  makeProduto(12, "Jujuba",          "5.00",   10, "Doce Arte",   "https://placehold.co/48x48/png"),
  makeProduto(13, "Donut",          "7.50",   8, "Doce Arte",   "https://placehold.co/48x48/png"),
  makeProduto(14, "Pavê de Pote",   "17.30",   4, "Sweet Co.",   "https://placehold.co/48x48/png"),
  makeProduto(15, "Pudim de Pote",   "12.50",   9, "Sweet Co.",   "https://placehold.co/48x48/png"),
  makeProduto(16, "Rocambole",        "16.00",   4, "Doce Arte",   "https://placehold.co/48x48/png"),
  makeProduto(17, "Churros",          "5.75",   13, "Pâtisserie BR",   "https://placehold.co/48x48/png"),
];

export default function TestePage() {
  const [modalAberto, setModalAberto] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 gap-4">
      
      <button
        onClick={() => setModalAberto("criar")}
        className="px-5 py-3 rounded-2xl bg-violet-500 text-white font-semibold text-sm hover:bg-violet-600 transition-all"
      >
        Abrir Criar Produto
      </button>

      <button
        onClick={() => setModalAberto("editar")}
        className="px-5 py-3 rounded-2xl bg-white text-gray-800 font-semibold text-sm hover:bg-gray-100 border border-gray-200 transition-all"
      >
        Abrir Editar Produto
      </button>

      {modalAberto === "criar" && (
        <CriaProduto
          lojaId={1}
          onClose={() => setModalAberto(null)}
          onSucesso={() => console.log("Produto criado com sucesso!")}
        />
      )}

      {modalAberto === "editar" && (
        <EditaProduto
          produto={produtoMock}
          onClose={() => setModalAberto(null)}
          onSucesso={() => console.log("Produto atualizado/deletado com sucesso!")}
        />
      )}

      {/* Indice Pagina - produtos */}
      <IndicePagina
        titulo="Produtos"
        produtos={mockProdutos}
        onProductClick={(p) => console.log("carrossel clicado:", p)}
      />

      <div className="h-16" />
    </div>
  );
}