"use client";

import CarrosselAvaliacao, { Avaliacao } from "../components/ui/CarrosselAvaliacao";

// Dados mockados apenas para testar o carrossel visualmente.
const avaliacoesMock: Avaliacao[] = [
  {
    id: 1,
    nomeUsuario: "Mariana Souza",
    comentario:
      "Atendimento excelente, super recomendo! A loja é organizada e o produto chegou antes do prazo combinado.",
    nota: 5,
    avatarUrl: "https://i.pravatar.cc/120?img=47",
  },
  {
    id: 2,
    nomeUsuario: "João Pedro",
    comentario: "Bom produto, mas a entrega atrasou um pouco.",
    nota: 4,
    avatarUrl: null, // testa o avatar placeholder
  },
  {
    id: 3,
    nomeUsuario: "Carla Lima",
    comentario: null, // testa o card sem comentário
    nota: 3,
    avatarUrl: "https://i.pravatar.cc/120?img=12",
  },
  {
    id: 4,
    nomeUsuario: "Ricardo Alves",
    comentario:
      "Não gostei muito, esperava algo diferente da descrição anunciada no site.",
    nota: 2,
    avatarUrl: null,
  },
  {
    id: 5,
    nomeUsuario: "Fernanda Costa Albuquerque",
    comentario: "Experiência mediana, o atendimento poderia ser mais rápido.",
    nota: 1,
    avatarUrl: "https://i.pravatar.cc/120?img=32",
  },
];

export default function PaginaTesteAvaliacoes() {
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-7xl">
        <CarrosselAvaliacao
          titulo="Avaliações dos clientes"
          avaliacoes={avaliacoesMock}
        />
      </div>
    </main>
  );
}