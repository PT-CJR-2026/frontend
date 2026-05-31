import React from 'react';
import Image from 'next/image';

interface CardCategoriaProps {
  titulo: string;
  iconeSrc: string; //caminho da imagem
  onClick?: () => void;
}

export function CardCategoria({ titulo, iconeSrc, onClick }: CardCategoriaProps) {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center justify-center w-28 h-28 bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow cursor-pointer select-none shrink-0"
    >
      {/* Área do Ícone */}
      <div className="w-10 h-10 mb-2 flex items-center justify-center relative">
          <Image 
            src={iconeSrc} 
            alt={`Ícone da categoria ${titulo}`} 
            width={40} 
            height={40} 
            className="object-contain"
          />
        )
        
      </div>

      {/* Título da Categoria */}
      <span className="text-sm font-semibold text-slate-700 tracking-tight text-center px-2">
        {titulo}
      </span>
      
    </div>
  );
}