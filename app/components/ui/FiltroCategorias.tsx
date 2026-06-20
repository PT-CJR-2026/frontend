"use client";

import React, { useState, useRef, useEffect } from 'react';

const OPCOES_FILTRO_DEFAULT = [
  { id: 'mercado', label: 'mercado', icone: '/miniCategoria/mercado.svg' },
  { id: 'farmacia', label: 'farmácia', icone: '/miniCategoria/farmacia.svg' },
  { id: 'beleza', label: 'beleza', icone: '/miniCategoria/beleza.svg' },
  { id: 'moda', label: 'moda', icone: '/miniCategoria/moda.svg' },
  { id: 'eletronicos', label: 'eletrônicos', icone: '/miniCategoria/eletronicos.svg' },
  { id: 'jogos', label: 'jogos', icone: '/miniCategoria/jogos.svg' },
  { id: 'brinquedos', label: 'brinquedos', icone: '/miniCategoria/brinquedos.svg' },
  { id: 'casa', label: 'casa', icone: '/miniCategoria/casa.svg' },
];

interface OpcaoFiltro {
  id: string;
  label: string;
  icone?: string;
}

interface FiltroCategoriasProps {
  categoriasSelecionadas: string[];
  onToggleCategoria: (categoriaId: string) => void;
  opcoes?: OpcaoFiltro[];
  titulo?: string;
}

export function FiltroCategorias({
  categoriasSelecionadas,
  onToggleCategoria,
  opcoes = OPCOES_FILTRO_DEFAULT,
  titulo = "filtros",
}: FiltroCategoriasProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

      {/* Botão principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-44 px-4 py-1.5 bg-white rounded-full shadow-sm text-[#6A38F3] font-medium text-lg cursor-pointer transition-opacity ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span>{titulo}</span>
        <svg
          className="w-5 h-5"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-0 right-0 w-52 bg-white rounded-2xl shadow-lg p-4 z-50 flex flex-col gap-3">

          {/* Título + fechar */}
          <div
            className="flex justify-between items-center mb-1 cursor-pointer text-[#6A38F3]"
            onClick={() => setIsOpen(false)}
          >
            <span className="font-medium text-lg">{titulo}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>

          {/* Opções */}
          {opcoes.map((opcao) => {
            const isSelected = categoriasSelecionadas.includes(opcao.id);

            return (
              <label key={opcao.id} className="flex items-center gap-2 cursor-pointer group">

                {/* Checkbox estilizado */}
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border-[1.5px] transition-colors ${
                    isSelected
                      ? 'bg-white border-[#6A38F3]'
                      : 'border-[#6A38F3] bg-white group-hover:bg-purple-50'
                  }`}
                  onClick={() => onToggleCategoria(opcao.id)}
                >
                  {isSelected && <div className="w-3 h-3 bg-[#6A38F3] rounded-[2px]" />}
                </div>

                <input
                  type="checkbox"
                  className="hidden"
                  checked={isSelected}
                  onChange={() => onToggleCategoria(opcao.id)}
                />

                <span className="text-[#6A38F3] text-[15px] font-normal tracking-wide">
                  {opcao.label}
                </span>

                {opcao.icone && (
                  <img
                    src={opcao.icone}
                    alt=""
                    className="w-4 h-4 object-contain ml-auto opacity-70"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}