"use client";

import React, { useState, useRef, useEffect } from 'react';

const OPCOES_FILTRO = [
  { id: 'mercado', label: 'mercado', icone: '/miniCategoria/mercado.svg' },
  { id: 'farmácia', label: 'farmácia', icone: '/miniCategoria/farmacia.svg' },
  { id: 'beleza', label: 'beleza', icone: '/miniCategoria/beleza.svg' },
  { id: 'moda', label: 'moda', icone: '/miniCategoria/moda.svg' },
  { id: 'eletrônicos', label: 'eletrônicos', icone: '/miniCategoria/eletronicos.svg' },
  { id: 'jogos', label: 'jogos', icone: '/miniCategoria/jogos.svg' },
  { id: 'brinquedos', label: 'brinquedos', icone: '/miniCategoria/brinquedos.svg' },
  { id: 'casa', label: 'casa', icone: '/miniCategoria/casa.svg' },
];

interface FiltroCategoriasProps {
  categoriasSelecionadas: string[];
  onToggleCategoria: (categoriaId: string) => void;
}

export function FiltroCategorias({ categoriasSelecionadas, onToggleCategoria }: FiltroCategoriasProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // efeito para fechar o menu ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* botão Principal "filtros" - Fica invisível (opacity-0) quando o menu abre para não duplicar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-36 px-4 py-1.5 bg-white rounded-full shadow-sm text-[#6A38F3] font-medium text-lg cursor-pointer transition-opacity ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span>filtros</span>
        {/* setinha que gira quando o menu abre */}
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* menu Dropdown Flutuante - Agora usa top-0 para sobrepor perfeitamente o botão original */}
      {isOpen && (
        <div className="absolute top-0 right-0 w-48 bg-white rounded-2xl shadow-lg p-4 z-50 flex flex-col gap-3">
          
          {/* Título interno do Dropdown e setinha pra cima */}
          <div className="flex justify-between items-center mb-1 cursor-pointer text-[#6A38F3]" onClick={() => setIsOpen(false)}>
            <span className="font-medium text-lg">filtros</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>

          {/* lista de Checkboxes */}
          {OPCOES_FILTRO.map((opcao) => {
            const isSelected = categoriasSelecionadas.includes(opcao.id);

            return (
              <label key={opcao.id} className="flex items-center gap-2 cursor-pointer group">
                
                {/* O Checkbox Quadrado Estilizado */}
                <div className={`w-5 h-5 rounded flex items-center justify-center border-[1.5px] transition-colors ${
                  isSelected ? 'bg-white border-[#6A38F3]' : 'border-[#6A38F3] bg-white group-hover:bg-purple-50'
                }`}>
                  {/* Bolinha ou Check interno quando selecionado (o protótipo parece um quadrado arredondado vazio que preenche) */}
                  {isSelected && <div className="w-3 h-3 bg-[#6A38F3] rounded-[2px]"></div>}
                </div>

                {/* Input Real (Escondido) */}
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isSelected}
                  onChange={() => onToggleCategoria(opcao.id)}
                />

                {/* Texto da Categoria */}
                <span className="text-[#6A38F3] text-[15px] font-normal tracking-wide">
                  {opcao.label}
                </span>

                {/* Mini Ícone */}
                <img
                  src={opcao.icone}
                  alt=""
                  className="w-4 h-4 object-contain ml-auto opacity-70"
                  // Esconde a imagem temporariamente se você ainda não tiver salvo na pasta public
                  onError={(e) => { e.currentTarget.style.display = 'none' }} 
                />
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}