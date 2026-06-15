"use client";

import { useEffect, useState } from "react";
import CarrosselAvaliacao, { Avaliacao } from "../components/ui/CarrosselAvaliacao";
import {
  AvaliacaoProdutoService,
  AvaliacaoLojaService,
  mapAvaliacaoProdutoParaCard,
  mapAvaliacaoLojaParaCard,
} from "../services/AvaliacaoService";

const PRODUTO_ID = 25;
const LOJA_ID = 1;

const avaliacaoProdutoService = new AvaliacaoProdutoService();
const avaliacaoLojaService = new AvaliacaoLojaService();

interface EstadoAvaliacoes {
  dados: Avaliacao[];
  carregando: boolean;
  erro: string | null;
}
function useAvaliacoes<T>(
  buscar: () => Promise<T[]>,
  converter: (item: T) => Avaliacao
): EstadoAvaliacoes {
  const [estado, setEstado] = useState<EstadoAvaliacoes>({
    dados: [],
    carregando: true,
    erro: null,
  });

  useEffect(() => {
    let ativo = true;

    buscar()
      .then((dados) => {
        if (!ativo) return;
        setEstado({ dados: dados.map(converter), carregando: false, erro: null });
      })
      .catch(() => {
        if (!ativo) return;
        setEstado({
          dados: [],
          carregando: false,
          erro: "Não foi possível carregar as avaliações.",
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

export default function PaginaTesteAvaliacoes() {
  const avaliacoesProduto = useAvaliacoes(
    () => avaliacaoProdutoService.findByProduto(PRODUTO_ID),
    mapAvaliacaoProdutoParaCard
  );

  const avaliacoesLoja = useAvaliacoes(
    () => avaliacaoLojaService.findByLoja(LOJA_ID),
    mapAvaliacaoLojaParaCard
  );

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-7xl space-y-12">
        <SecaoAvaliacoes
          titulo={`Avaliações do produto #${PRODUTO_ID}`}
          estado={avaliacoesProduto}
          mensagemVazio="Esse produto ainda não tem avaliações."
        />

        <SecaoAvaliacoes
          titulo={`Avaliações da loja #${LOJA_ID}`}
          estado={avaliacoesLoja}
          mensagemVazio="Essa loja ainda não tem avaliações."
        />
      </div>

      <h2 className="mx-auto max-w-7xl space-y-12 text-gray-800">
        São os que estão no banco kkkkkkk
      </h2>
    </main>
  );
}