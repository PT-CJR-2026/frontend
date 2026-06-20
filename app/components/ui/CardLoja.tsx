import React from 'react';

export interface Loja {
  id: string | number;
  nome: string;
  categoria: string;
  logoUrl: string;
}

interface CardLojaProps {
  loja: Loja;
  onClick?: (loja: Loja) => void;
}

export function CardLoja({ loja, onClick }: CardLojaProps) {
  return (
    <div 
      onClick={() => onClick?.(loja)}
      className="flex flex-col items-center justify-start w-36 cursor-pointer shrink-0 group"
    >
      {/* Círculo da Logo */}
      <div className="w-32 h-32 rounded-full overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow bg-white flex items-center justify-center">
        <img 
          src={loja.logoUrl} 
          alt={`Logo da loja ${loja.nome}`}
          draggable={false}
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Nome da Loja */}
      <h3 className="text-sm font-medium text-slate-800 text-center leading-tight line-clamp-1 w-full px-1">
        {loja.nome}
      </h3>
      
      {/* Categoria da Loja */}
      <span className="text-xs font-semibold text-[#6A38F3] text-center mt-0 uppercase">
        {loja.categoria}
      </span>
      
    </div>
  );
}