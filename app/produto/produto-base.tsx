"use client";

import { X, ChevronDown } from "lucide-react";
import ImagemInput from "../components/ui/ImageInput";
import { useState } from "react";

export default function ProdutoBase() {

  {/* Seleção da categoria */}
  const [subcategoriaOpen, setSubcategoriaOpen] = useState(false);
  const [subcategoria, setSubcategoria] = useState("");

  // Editar conforme as categorias existentes. Dá até para separar isso em um outro arquivo se preferirem
  const subcategorias = [
    { value: "eletronicos", label: "Eletrônicos" },
    { value: "roupas", label: "Roupas" },
    { value: "alimentacao", label: "Alimentação" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="bg-[#EDEDED] rounded-3xl w-full max-w-sm p-6 relative shadow-xl">

        {/* Fechar */}
        <button
          className="
          absolute top-4 right-4 w-8 h-8 rounded-full
          bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-violet-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Titulo */}
        <h2 className="text-center text-x1 font-semibold text-gray-800 mb-5">
            Adicionar produto
        </h2>

        {/* Input de imagens */}
        <ImagemInput large />
        <div className="grid grid-cols-3 gap-3 mt-3 mb-5">
            <ImagemInput/>
            <ImagemInput/>
            <ImagemInput/>
        </div>

        {/* Inputs de dados do produto */}
        <div className="flex flex-col gap-3 mb-5">
          {/* Input de nome do produto */}
          <input
            type="text"
            placeholder="Nome do produto"
            className="
            w-full rounded-full px-4 py-3 bg-[#FFFFFF]
            text-sm bg-gray-50 text-gray-700 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-violet-300"
          />

        {/* Seleção */}
        <div className={`w-full bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden transition-all duration-200
          ${subcategoriaOpen ? "ring-2 ring-violet-300 border-violet-300" : ""}`}>
          
          {/* Trigger */}
          <button
            type="button"
            onClick={() => setSubcategoriaOpen(!subcategoriaOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm
              ${subcategoria ? "text-gray-700" : "text-gray-400"}
              focus:outline-none cursor-pointer`}
          >
            <span>
              {subcategoria
                ? subcategorias.find((s) => s.value === subcategoria)?.label
                : "Subcategoria"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                subcategoriaOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Subcategoria expandida (as opções) */}
          {subcategoriaOpen && (
            <div className="border-t border-gray-200 px-2 pb-2 max-h-48 overflow-y-auto">
              {subcategorias.map((opcao) => (
                <label
                  key={opcao.value}
                  className="flex items-center gap-3 px-3 py-2.5 mt-2 rounded-2xl cursor-pointer hover:bg-violet-100 transition-colors duration-150"
                >
                  <input
                    type="radio"
                    name="subcategoria"
                    value={opcao.value}
                    checked={subcategoria === opcao.value}
                    onChange={() => {
                      setSubcategoria(opcao.value);
                      setSubcategoriaOpen(false);
                    }}
                    className="accent-violet-500 w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">{opcao.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Input de descrição */}
        <input
          type="text"
          placeholder="Descrição do produto"
          className="
          w-full rounded-full px-4 py-3 bg-[#FFFFFF]
          text-sm bg-gray-50 text-gray-700 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-violet-300"
        />

        {/* Input de preço */}
        <input
          type="text"
          placeholder="Preço do produto"
          className="
          w-full rounded-full px-4 py-3 bg-[#FFFFFF]
          text-sm bg-gray-50 text-gray-700 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-violet-300"
        />

        </div>
      </div>
    </div>
  );
}