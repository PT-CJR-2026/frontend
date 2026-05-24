"use client";

import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import ProdutoBase from "./produto-base";
import { produtoSchema } from "../components/schema/produto-schema";

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  subcategoria: string;
}

interface EditaProdutoProps {
  produto: Produto;
  onClose: () => void;
  onSucesso?: () => void;
}

export default function EditaProduto({ produto, onClose, onSucesso }: EditaProdutoProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);

  const formik = useFormik({
    initialValues: {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: String(produto.preco),
      estoque: String(produto.estoque),
      subcategoria: produto.subcategoria,
    },
    validationSchema: produtoSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await axios.put(`/api/produto/${produto.id}`, {
          nome: values.nome,
          descricao: values.descricao,
          preco: parseFloat(values.preco),
          estoque: parseInt(values.estoque),
          subcategoria: values.subcategoria,
        });
        onSucesso?.();
        onClose();
      } catch {
        setStatus("Erro ao salvar alterações. Tente novamente.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleDeletar = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    try {
      setLoadingDel(true);
      await axios.delete(`/api/produto/${produto.id}`);
      onSucesso?.();
      onClose();
    } catch {
      formik.setStatus("Erro ao deletar produto. Tente novamente.");
    } finally {
      setLoadingDel(false);
      setConfirmDelete(false);
    }
  };

  return (
    <ProdutoBase formik={formik} onClose={onClose}>
      {formik.status && (
        <p className="text-red-500 text-sm text-center mb-3">{formik.status}</p>
      )}

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => formik.handleSubmit()}
          disabled={formik.isSubmitting}
          className="w-full py-3 rounded-2xl bg-violet-500 text-white font-semibold text-sm hover:bg-violet-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formik.isSubmitting ? "Salvando..." : "Salvar alterações"}
        </button>

        <button
          type="button"
          onClick={handleDeletar}
          disabled={loadingDel}
          className={`w-full py-3 rounded-2xl font-semibold text-sm active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed
            ${confirmDelete
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-white text-red-500 hover:bg-red-50 border border-red-200"}`}
        >
          {loadingDel ? "Deletando..." : confirmDelete ? "Confirmar exclusão" : "Deletar produto"}
        </button>

        {confirmDelete && (
          <button
            type="button"
            onClick={() => setConfirmDelete(false)}
            className="text-xs text-gray-400 text-center hover:text-gray-600 transition-colors"
          >
            Cancelar exclusão
          </button>
        )}
      </div>
    </ProdutoBase>
  );
}