"use client";

import { CardLoja, Loja } from "./CardLoja";

// Dados mockados exclusivos para a apresentação de hoje.
// Pós-apresentação, remover essa constante e receber as lojas via Props (da API).
const MOCK_LOJAS: Loja[] = [
  { id: 1, nome: "CJR", categoria: "mercado", logoUrl: "/logosLojas/LogoCJR.png" },
  { id: 2, nome: "Rare Beauty", categoria: "beleza", logoUrl: "/logosLojas/LogoRareB.png" },
  { id: 3, nome: "The Croc Brew", categoria: "mercado", logoUrl: "/logosLojas/LogoCrocB.png" },
  { id: 4, nome: "Mini Reno", categoria: "casa", logoUrl: "/logosLojas/LogoMiniReno.png" },
  { id: 5, nome: "amoca", categoria: "moda", logoUrl: "/logosLojas/LogoAmoca.png" },
  { id: 6, nome: "Repiit", categoria: "eletrônicos", logoUrl: "/logosLojas/LogoRepiit.png" },
  { id: 7, nome: "Creamy Skincare", categoria: "beleza", logoUrl: "/logosLojas/LogoCreamy.png" },
  { id: 8, nome: "Maumar", categoria: "mercado", logoUrl: "/logosLojas/LogoMaumar.png" },
  { id: 9, nome: "SneakerStore", categoria: "moda", logoUrl: "/logosLojas/LogoSneacker.png" },
  { id: 10, nome: "Melina Couture", categoria: "moda", logoUrl: "/logosLojas/LogoMelina.png" },
  { id: 11, nome: "d'carts & baskets", categoria: "mercado", logoUrl: "/logosLojas/LogoBasckets.png" },
  { id: 12, nome: "Fluffy House", categoria: "casa", logoUrl: "/logosLojas/LogoFluffy.png" },
  { id: 13, nome: "electree", categoria: "eletrônicos", logoUrl: "/logosLojas/LogoElectree.png" },
  { id: 14, nome: "Roots", categoria: "beleza", logoUrl: "/logosLojas/LogoRoots.png" },
];

interface CarrosselLojaProps {
  titulo?: string;
  onLojaClick?: (loja: Loja) => void;
  acaoCabecalho?: React.ReactNode; // Permite passar um "Filtros" direto da página
}

export default function CarrosselLoja({
  titulo,
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
        {MOCK_LOJAS.map((loja) => (
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