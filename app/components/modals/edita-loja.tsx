"use client";

import { useState } from "react";
import { useFormik } from "formik";
import LojaBase, { ImagensLoja, imagensLojasVazias } from "./loja-base";
import { lojaSchema } from "../schema/loja-schema";
import { ModalService } from "../../services/ModalService";

interface Loja {
  id: number;
  nome: string;
  descricao: string | null;
  logo_url: string | null;
  banner_url: string | null;
  sticker_url: string | null;
}

interface EditaLojaProps {
  loja: Loja;
  onClose: () => void;
  onSucesso?: () => void;
}

export default function EditaLoja({ loja, onClose, onSucesso }: EditaLojaProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);

  const [imagens, setImagens] = useState<ImagensLoja>(imagensLojasVazias);

  const formik = useFormik({
    initialValues: {
      nome: loja.nome,
      descricao: loja.descricao ?? "",
    },
    validationSchema: lojaSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await ModalService.atualizarLoja(loja.id, {
          nome: values.nome,
          descricao: values.descricao,
        });

        await ModalService.salvarImagensLoja(loja.id, imagens);

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
      await ModalService.deletarLoja(loja.id);
      onSucesso?.();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao deletar loja.";
      formik.setStatus(msg);
    } finally {
      setLoadingDel(false);
      setConfirmDelete(false);
    }
  };

  return (
    <LojaBase
      formik={formik}
      onClose={onClose}
      imagens={imagens}
      onImagensChange={setImagens}
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
          {loadingDel ? "Deletando..." : confirmDelete ? "Confirmar exclusão" : "Deletar loja"}
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
    </LojaBase>
  );
}