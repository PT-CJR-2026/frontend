"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/layout/Navbar";
import HeroLoja from "@/app/components/layout/HeroLoja";
import CarrosselCardProdutos from "@/app/components/ui/CarrosselProduto";
import { Produto } from "@/app/components/ui/CardProduto";

import CarrosselAvaliacao from "@/app/components/ui/CarrosselAvaliacao";
import NotaEstrela from "@/app/components/ui/NotaEstrela";
import IndicePagina from "@/app/components/ui/IndicePaginas";

// Tipagem espelhada no JSON do Back-end
interface AvaliacaoAPI {
  id: number;
  nota: number;
  comentario: string | null;
  usuario: {
    id: number;
    username: string;
    foto_perfil_url: string | null;
  };
}

interface LojaData {
  id: number;
  nome: string;
  banner_url: string;
  categoria: string | null;
  usuario: {
    nome: string | null;
    username: string;
  };
  avaliacoes: AvaliacaoAPI[];
  produtos: Produto[];
}

export default function LojaPage({ params }: { params: React.Usable<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();

  const [dadosLoja, setDadosLoja] = useState<LojaData | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    fetch(`http://127.0.0.1:3001/lojas/${id}?t=${new Date().getTime()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Recusado pelo servidor");
        return res.json();
      })
      .then((data: LojaData) => {
        setDadosLoja(data);
        setCarregando(false);
      })
      .catch(() => {
        setErro(true);
        setCarregando(false);
      });
  }, [id]);

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F3E4]">
        <p className="text-xl font-semibold text-gray-500">Carregando a loja...</p>
      </div>
    );
  }

  if (erro || !dadosLoja) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F3E4]">
        <p className="text-xl font-semibold text-red-500">Erro: Loja não encontrada ou servidor offline.</p>
      </div>
    );
  }

  // Cálculos de nota
  const totalNotas = dadosLoja.avaliacoes?.reduce((acc, av) => acc + av.nota, 0) || 0;
  const qtdAvaliacoes = dadosLoja.avaliacoes?.length || 0;
  const notaMedia = qtdAvaliacoes > 0 ? totalNotas / qtdAvaliacoes : 0;

  const produtosParaCarrossel = dadosLoja.produtos ? dadosLoja.produtos.slice(0, 10) : [];

  const lidarComCliqueProduto = (produto: Produto) => {
    router.push(`/produto/${produto.id}`);
  };

  // Mapeamento das avaliações do Back-end
  const avaliacoesMapeadas = dadosLoja.avaliacoes?.map((av) => ({
    id: av.id,
    nomeUsuario: av.usuario?.username || "Usuário Anônimo",
    comentario: av.comentario,
    nota: av.nota,
    avatarUrl: av.usuario?.foto_perfil_url,
  })) || [];

  return (
    <main className="min-h-screen bg-[#F6F3E4] flex flex-col">
      {/* Navbar */}
      <Navbar logoSrc="/logo-branca-stock.io.svg" logoAlt="Stock.IO" />

      {/* Hero */}
      <HeroLoja 
        nomeLoja={dadosLoja.nome}
        categoria={dadosLoja.categoria || "Geral"} 
        nota={notaMedia} 
        bannerUrl={dadosLoja.banner_url}
        criador={dadosLoja.usuario?.nome || dadosLoja.usuario?.username || "Desconhecido"} 
        usernameCriador={dadosLoja.usuario?.username || ""} 
      />

      {/* Carrossel de produtos melhores avaliados */}
      <div className="px-6 md:px-10 mt-12 mb-20">
        {produtosParaCarrossel.length > 0 ? (
          <CarrosselCardProdutos
            titulo="Produtos"
            ordenacao="melhores avaliados"
            produtos={produtosParaCarrossel}
            onProductClick={lidarComCliqueProduto}
          />
        ) : (
          <p className="text-[#888] text-sm mt-8 ml-2">Esta loja ainda não possui produtos.</p>
        )}
      </div>

      {/* Sessão de Review e Comentários do Figma */}
      <section className="w-full bg-black py-20 flex flex-col items-center overflow-hidden">
        <h2 className="text-white text-[32px] md:text-[50px] font-medium mb-4 text-center" style={{ fontFamily: "'League Spartan', sans-serif" }}>
          Reviews e Comentários
        </h2>

        {/* Nota 4.75 Gigante */}
        <span className="text-white text-[56px] md:text-[80px] font-medium leading-none mb-6">
          {notaMedia > 0 ? notaMedia.toFixed(2) : "0.00"}
        </span>

        {/* Estrelas do componente oficial */}
        <div className="mb-16">
          <NotaEstrela nota={notaMedia} tamanho={40} />
        </div>

        {/* Carrossel alinhado à esquerda como pede o design */}
        <div className="w-full pl-6 md:pl-10">
          {avaliacoesMapeadas.length > 0 ? (
            <CarrosselAvaliacao avaliacoes={avaliacoesMapeadas} />
          ) : (
            <p className="text-[#888] text-center text-sm w-full pr-6 md:pr-10">
              Esta loja ainda não possui avaliações.
            </p>
          )}
        </div>
      </section>

      {/* Nova Sessão com o Grid Paginado */}
      <section className="px-6 md:px-10 mt-20 mb-20 w-full max-w-[1400px] mx-auto">
        {/* Título Customizado igual ao Figma */}
        <div className="mb-10">
          <h2 className="text-[#111] leading-none flex items-baseline gap-2" style={{ fontFamily: "'League Spartan', sans-serif" }}>
            <span className="font-bold text-[36px] md:text-[44px]">Produtos</span>
            <span className="font-normal text-[20px] md:text-[26px]">de {dadosLoja.nome.toLowerCase()}</span>
          </h2>
        </div>

        {dadosLoja.produtos && dadosLoja.produtos.length > 0 ? (
          <IndicePagina 
            titulo="Produtos" 
            produtos={dadosLoja.produtos} 
            onProductClick={lidarComCliqueProduto} 
          />
        ) : (
          <p className="text-[#888] text-sm">Esta loja ainda não possui produtos para exibir na galeria.</p>
        )}
      </section>

    </main>
  );
}