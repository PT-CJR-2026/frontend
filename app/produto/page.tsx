"use client";

import Navbar from "../components/layout/Navbar";
import CarrosselAvaliacao, { Avaliacao } from "../components/ui/CarrosselAvaliacao";
import NotaEstrela from "../components/ui/NotaEstrela";
import GaleriaProduto from "../components/ui/GaleriaProduto";
import EditaProduto from "../components/modals/EditaProdutoModal";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  AvaliacaoProdutoService,
  mapAvaliacaoProdutoParaCard,
} from "../services/AvaliacaoService";
import { ProdutoService } from "../services/ProdutoService";
import { Produto } from "../components/ui/CardProduto";

const avaliacaoProdutoService = new AvaliacaoProdutoService();
const produtoService = new ProdutoService();

interface EstadoAvaliacoes {
  dados: Avaliacao[];
  carregando: boolean;
  erro: string | null;
}

interface AvaliacaoBruta {
  nota: number;
  comentario: string | null;
}

function useAvaliacoes<T extends AvaliacaoBruta>(
  buscar: () => Promise<T[]>,
  converter: (item: T) => Avaliacao
): EstadoAvaliacoes & { media: number; total: number } {
  const [estado, setEstado] = useState<EstadoAvaliacoes & { media: number; total: number }>({
    dados: [],
    carregando: true,
    erro: null,
    media: 0,
    total: 0,
  });

  useEffect(() => {
    let ativo = true;
    buscar()
      .then((dados) => {
        if (!ativo) return;
        const total = dados.length;
        const media =
          total > 0 ? dados.reduce((soma, item) => soma + item.nota, 0) / total : 0;
        setEstado({
          dados: dados.map(converter),
          carregando: false,
          erro: null,
          media,
          total,
        });
      })
      .catch(() => {
        if (!ativo) return;
        setEstado({
          dados: [],
          carregando: false,
          erro: "Não foi possível carregar as avaliações.",
          media: 0,
          total: 0,
        });
      });
    return () => {
      ativo = false;
    };
  }, []);

  return estado;
}

function SecaoAvaliacoes({
  titulo,
  estado,
  mensagemVazio,
}: {
  titulo: string;
  estado: EstadoAvaliacoes;
  mensagemVazio: string;
}) {
  if (estado.carregando) {
    return <p className="text-slate-500">Carregando avaliações...</p>;
  }
  if (estado.erro) {
    return <p className="text-red-500">{estado.erro}</p>;
  }
  if (estado.dados.length === 0) {
    return <p className="text-slate-500">{mensagemVazio}</p>;
  }
  return <CarrosselAvaliacao titulo={titulo} avaliacoes={estado.dados} />;
}

function useProduto(produtoId: number) {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    Promise.all([
      produtoService.getById(produtoId),
      produtoService.getImagens(produtoId).catch(() => []),
    ])
      .then(([dadosProduto, imagens]) => {
        if (!ativo) return;
        setProduto({ ...dadosProduto, imagem_produto: imagens });
        setErro(null);
      })
      .catch(() => {
        if (!ativo) return;
        setErro("Não foi possível carregar o produto.");
      })
      .finally(() => {
        if (!ativo) return;
        setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, [produtoId]);

  return { produto, carregando, erro };
}

export default function ProdutoPage() {
  const params = useParams();
  const produtoId = Number(params?.id ?? 25);

  const { produto, carregando, erro } = useProduto(produtoId);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);

  const avaliacoesProduto = useAvaliacoes(
    () => avaliacaoProdutoService.findByProduto(produtoId),
    mapAvaliacaoProdutoParaCard
  );

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#F6F3E4]">
        <Navbar logoSrc="/logo-branca-stock.io.svg" />
        <p className="text-center mt-20 text-slate-500">Carregando produto...</p>
      </div>
    );
  }

  if (erro || !produto) {
    return (
      <div className="min-h-screen bg-[#F6F3E4]">
        <Navbar logoSrc="/logo-branca-stock.io.svg" />
        <p className="text-center mt-20 text-red-500">
          {erro ?? "Produto não encontrado."}
        </p>
      </div>
    );
  }

  const preco = parseFloat(String(produto.preco));
  const precoFormatado = preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      <Navbar logoSrc="/logo-branca-stock.io.svg" />

      <div className="px-6 md:px-10 mt-8 flex flex-col lg:flex-row gap-10">
        {/* Galeria */}
        <GaleriaProduto nome={produto.nome} imagens={produto.imagem_produto ?? []} />

        {/* Informações */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-start gap-2">
            <h1 className="text-3xl font-semibold text-[#111] m-0">
              {produto.nome}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                onClick={() => setModalEdicaoAberto(true)}
                aria-label="Editar produto"
                className="w-7 h-7 rounded-full bg-[#6A38F3] flex items-center justify-center text-white hover:bg-[#5a2ee0] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Favoritar produto"
                className="w-7 h-7 rounded-full bg-[#FFC400] flex items-center justify-center text-white hover:bg-[#e0ac00] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 7.1-1.01L12 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Rating + mercado + estoque */}
          <div className="flex items-center gap-2 mt-2 text-sm">
            <NotaEstrela nota={avaliacoesProduto.media} tamanho={16} />
            <span className="text-[#111] font-medium">
              {avaliacoesProduto.media.toFixed(1)} | {avaliacoesProduto.total} reviews
            </span>
            <span className="text-[#6A38F3] font-medium ml-2">mercado</span>
            <span
              className={`ml-2 font-semibold ${
                produto.estoque > 0 ? "text-[#19c257]" : "text-[#AF052A]"
              }`}
            >
              {produto.estoque > 0
                ? `${produto.estoque} disponíveis`
                : "indisponível"}
            </span>
          </div>

          {/* Preço */}
          <p className="text-4xl font-semibold text-[#111] mt-4">
            {precoFormatado}
          </p>

          {/* Descrição */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-[#111] mb-2">Descrição</h2>
            <p className="text-sm text-[#333] whitespace-pre-line leading-relaxed">
              {produto.descricao}
            </p>
          </div>
        </div>
      </div>

      {/* Avaliações */}
      <div className="px-6 md:px-10 mt-12 mb-12">
        <h2 className="text-3xl font-semibold text-[#111] mb-4">Avaliações</h2>
        <SecaoAvaliacoes
          titulo={`Avaliações do produto #${produtoId}`}
          estado={avaliacoesProduto}
          mensagemVazio="Esse produto ainda não tem avaliações."
        />
      </div>

      {/* Modal de edição */}
      {modalEdicaoAberto && (
        <EditaProduto
          produto={{
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao ?? "",
            preco: preco,
            estoque: produto.estoque,
            subcategoria: String(produto.categoria_id),
            imagens: (produto.imagem_produto ?? []).map((img) => ({
              url_imagem: img.url_imagem,
              ordem: img.ordem,
            })),
          }}
          onClose={() => setModalEdicaoAberto(false)}
          onSucesso={() => {
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}