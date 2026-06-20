"use client";

import { X, ChevronDown } from "lucide-react";
import ImagemInput from "../ui/ImageInput";
import { useState } from "react";
import { FormikProps } from "formik";
import { DadosProduto } from "../schema/produto-schema";
import CurrencyInput from "react-currency-input-field";

export interface ImagensProduto {
  principal: File | null;
  secundarias: (File | null)[];
}

interface ProdutoBaseProps {
  formik: FormikProps<DadosProduto>;
  onClose: () => void;
  imagens: ImagensProduto;
  onImagensChange: (imagens: ImagensProduto) => void;
  children?: React.ReactNode;
}

const subcategorias = [
  { value: "1", label: "Eletrônicos" },
  { value: "2", label: "Roupas" },
  { value: "3", label: "Alimentação" },
];

export default function ProdutoBase({
  formik,
  onClose,
  imagens,
  onImagensChange,
  children,
}: ProdutoBaseProps) {
  const [subcategoriaOpen, setSubcategoriaOpen] = useState(false);

  const erro = (campo: keyof DadosProduto) =>
    formik.touched[campo] && formik.errors[campo] ? (
      <span className="text-red-500 text-xs ml-1">{formik.errors[campo]}</span>
    ) : null;

  const handlePrincipal = (file: File | null) =>
    onImagensChange({ ...imagens, principal: file });

  const handleSecundaria = (index: number, file: File | null) => {
    const novas = [...imagens.secundarias] as (File | null)[];
    novas[index] = file;
    onImagensChange({ ...imagens, secundarias: novas });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="bg-[#EDEDED] rounded-3xl w-full max-w-sm p-6 relative shadow-xl max-h-[90vh] overflow-y-auto">

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-violet-200"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-5">
          Adicionar produto
        </h2>

        {/* Imagem principal */}
        <ImagemInput
          large
          value={imagens.principal}
          onChange={handlePrincipal}
        />

        {/* Imagens secundárias */}
        <div className="grid grid-cols-3 gap-3 mt-3 mb-5">
          {imagens.secundarias.map((file, i) => (
            <ImagemInput
              key={i}
              value={file}
              onChange={(f) => handleSecundaria(i, f)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3 mb-5">

          <div>
            <input
              type="text"
              placeholder="Nome do produto"
              {...formik.getFieldProps("nome")}
              className={`w-full rounded-2xl px-4 py-3 bg-white text-sm text-gray-700 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-violet-300
                ${formik.touched.nome && formik.errors.nome ? "ring-2 ring-red-300" : ""}`}
            />
            {erro("nome")}
          </div>

          <div>
            <div className={`w-full bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200
              ${subcategoriaOpen ? "ring-2 ring-violet-300 border-violet-300" : ""}
              ${formik.touched.subcategoria && formik.errors.subcategoria ? "ring-2 ring-red-300" : ""}`}
            >
              <button
                type="button"
                onClick={() => {
                  setSubcategoriaOpen(!subcategoriaOpen);
                  formik.setFieldTouched("subcategoria", true);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm
                  ${formik.values.subcategoria ? "text-gray-700" : "text-gray-400"}
                  focus:outline-none cursor-pointer`}
              >
                <span>
                  {formik.values.subcategoria
                    ? subcategorias.find((s) => s.value === formik.values.subcategoria)?.label
                    : "Subcategoria"}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${subcategoriaOpen ? "rotate-180" : ""}`} />
              </button>

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
                        checked={formik.values.subcategoria === opcao.value}
                        onChange={() => {
                          formik.setFieldValue("subcategoria", opcao.value);
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
            {erro("subcategoria")}
          </div>

          <div>
            <textarea
              placeholder="Descrição do produto"
              {...formik.getFieldProps("descricao")}
              className={`w-full h-20 rounded-2xl px-4 py-3 bg-white text-sm text-gray-700 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none
                ${formik.touched.descricao && formik.errors.descricao ? "ring-2 ring-red-300" : ""}`}
            />
            {erro("descricao")}
          </div>

          <div>
            <CurrencyInput
              id="preco"
              name="preco"
              placeholder="Preço do produto"
              decimalsLimit={2}
              decimalSeparator=","
              groupSeparator="."
              allowNegativeValue={false}
              prefix="R$ "
              value={formik.values.preco}
              onValueChange={(value) => formik.setFieldValue("preco", value || "")}
              onBlur={formik.handleBlur}
              className={`w-full rounded-2xl px-4 py-3 bg-white text-sm text-gray-700 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-violet-300
                ${formik.touched.preco && formik.errors.preco ? "ring-2 ring-red-300" : ""}`}
            />
            {erro("preco")}
          </div>

          <div>
            <div className="flex items-center justify-between rounded-2xl px-24 py-3">
              <button
                type="button"
                onClick={() => {
                  const atual = parseInt(formik.values.estoque) || 0;
                  if (atual > 0) formik.setFieldValue("estoque", String(atual - 1));
                  formik.setFieldTouched("estoque", true);
                }}
                className="w-10 h-10 rounded-full border-2 border-violet-500 text-violet-500 flex items-center justify-center hover:bg-violet-50 transition-colors font-bold text-3xl leading-none cursor-pointer"
              >
                −
              </button>
              <span className="text-gray-700 text-xl font-medium w-12 text-center select-none">
                {formik.values.estoque || "0"}
              </span>
              <button
                type="button"
                onClick={() => {
                  const atual = parseInt(formik.values.estoque) || 0;
                  formik.setFieldValue("estoque", String(atual + 1));
                  formik.setFieldTouched("estoque", true);
                }}
                className="w-10 h-10 rounded-full border-2 border-violet-500 text-violet-500 flex items-center justify-center hover:bg-violet-50 transition-colors font-bold text-3xl leading-none cursor-pointer"
              >
                +
              </button>
            </div>
            {erro("estoque")}
          </div>

        </div>

        {children}
      </div>
    </div>
  );
}