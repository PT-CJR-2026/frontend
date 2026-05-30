"use client";

import { useFormik } from "formik";
import { useState } from "react";
import ProdutoBase, { ImagensProduto } from "./produto-base";
import { produtoSchema, dadosVazios } from "../components/schema/produto-schema";
import { ModalService } from "../services/ModalService";

const imagensVazias: ImagensProduto = {
  principal: null,
  secundarias: [null, null, null],
};

interface CriaProdutoProps {
  lojaId: number;
  onClose: () => void;
  onSucesso?: () => void;
}

export default function CriaProduto({ lojaId, onClose, onSucesso }: CriaProdutoProps) {
  const [imagens, setImagens] = useState<ImagensProduto>(imagensVazias);

  const formik = useFormik({
    initialValues: dadosVazios,
    validationSchema: produtoSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const produto = await ModalService.criarProduto({
          loja_id: lojaId,
          nome: values.nome,
          descricao: values.descricao,
          preco: parseFloat(values.preco),
          estoque: parseInt(values.estoque),
          categoria_id: parseInt(values.subcategoria),
        });

        await ModalService.salvarImagensProduto(produto.id, imagens);

        onSucesso?.();
        onClose();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Erro ao criar produto.";
        setStatus(msg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <ProdutoBase
      formik={formik}
      onClose={onClose}
      imagens={imagens}
      onImagensChange={setImagens}
    >
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