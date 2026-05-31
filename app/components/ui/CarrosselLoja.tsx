"use client";

import { CardLoja, Loja } from "./CardLoja";

// Dados mockados exclusivos para a apresentação de hoje.
// Pós-apresentação, remover essa constante e receber as lojas via Props (da API).


interface CarrosselLojaProps {
  titulo?: string;
  Lojas: Loja[];
  onLojaClick?: (loja: Loja) => void;
  acaoCabecalho?: React.ReactNode; // Permite passar um "Filtros" direto da página
}

export default function CarrosselLoja({
  titulo,
  Lojas,
  onLojaClick,
  acaoCabecalho,
}: CarrosselLojaProps) {
  return (
    <section className="w-full">
      
      {/* Cabeçalho Flex: Título na esquerda, Ação (Botão) na direita */}
      {(titulo || acaoCabecalho) && (
        <div className="mb-6 flex items-center justify-between">
          {titulo && (
            <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
              {titulo}
            </h2>
          )}
          
          {/* Se a página passar um botão, ele renderiza aqui */}
          {acaoCabecalho && (
            <div>{acaoCabecalho}</div>
          )}
        </div>
      )}

      {/* Container do Carrossel */}
      <div 
        className="flex snap-x snap-mandatory gap-8 overflow-x-auto py-4 pl-1 
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {Lojas.map((loja) => (
          <div key={loja.id} className="shrink-0 snap-start">
            <CardLoja
              loja={loja}
              onClick={() => onLojaClick?.(loja)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}