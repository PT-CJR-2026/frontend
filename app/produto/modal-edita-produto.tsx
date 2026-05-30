"use client";

import { useState } from "react";
import { useFormik } from "formik";
import ProdutoBase, { ImagensProduto } from "./produto-base";
import { produtoSchema } from "../components/schema/produto-schema";
import { ModalService } from "../services/ModalService";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  subcategoria: string;
  imagens: { url_imagem: string; ordem: number }[];
}

interface EditaProdutoProps {
  produto: Produto;
  onClose: () => void;
  onSucesso?: () => void;
}

export default function EditaProduto({ produto, onClose, onSucesso }: EditaProdutoProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);

  const [imagensRemovidas, setImagensRemovidas] = useState<string[]>([]);
  const [imagens, setImagens] = useState<ImagensProduto>({
    principal: null,
    secundarias: [null, null, null],
  });

  const handleImagensChange = (novas: ImagensProduto) => {
    const urlPrincipalAtual = produto.imagens.find((i) => i.ordem === 1)?.url_imagem;
    if (novas.principal && urlPrincipalAtual && !imagensRemovidas.includes(urlPrincipalAtual)) {
      setImagensRemovidas((prev) => [...prev, urlPrincipalAtual]);
    }

    novas.secundarias.forEach((file, i) => {
      const urlAtual = produto.imagens.find((img) => img.ordem === i + 2)?.url_imagem;
      if (file && urlAtual && !imagensRemovidas.includes(urlAtual)) {
        setImagensRemovidas((prev) => [...prev, urlAtual]);
      }
    });

    setImagens(novas);
  };

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
        await ModalService.atualizarProduto(produto.id, {
          nome: values.nome,
          descricao: values.descricao,
          preco: parseFloat(values.preco),
          estoque: parseInt(values.estoque),
          categoria_id: parseInt(values.subcategoria),
        });

        await ModalService.atualizarImagensProduto(produto.id, imagens, imagensRemovidas);

        onSucesso?.();
        onClose();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Erro ao salvar alterações.";
        setStatus(msg);
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
      await ModalService.deletarProduto(produto.id);
      onSucesso?.();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao deletar produto.";
      formik.setStatus(msg);
    } finally {
      setLoadingDel(false);
      setConfirmDelete(false);
    }
  };

  return (
    <ProdutoBase
      formik={formik}
      onClose={onClose}
      imagens={imagens}
      onImagensChange={handleImagensChange}
    >
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