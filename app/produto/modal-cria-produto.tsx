"use client";

import { useFormik } from "formik";
import axios from "axios";
import ProdutoBase from "./produto-base";
import { produtoSchema, dadosVazios } from "../components/schema/produto-schema";

interface CriaProdutoProps {
  onClose: () => void;
  onSucesso?: () => void;
}

export default function CriaProduto({ onClose, onSucesso }: CriaProdutoProps) {
  const formik = useFormik({
    initialValues: dadosVazios,
    validationSchema: produtoSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await axios.post("/api/produto", {
          nome: values.nome,
          descricao: values.descricao,
          preco: parseFloat(values.preco),
          estoque: parseInt(values.estoque),
          subcategoria: values.subcategoria,
        });
        onSucesso?.();
        onClose();
      } catch {
        setStatus("Erro ao criar produto. Tente novamente.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <ProdutoBase formik={formik} onClose={onClose}>
      {formik.status && (
        <p className="text-red-500 text-sm text-center mb-3">{formik.status}</p>
      )}
      <button
        type="button"
        onClick={() => formik.handleSubmit()}
        disabled={formik.isSubmitting}
        className="w-full py-3 rounded-2xl bg-violet-500 text-white font-semibold text-sm hover:bg-violet-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formik.isSubmitting ? "Criando..." : "Criar produto"}
      </button>
    </ProdutoBase>
  );
}