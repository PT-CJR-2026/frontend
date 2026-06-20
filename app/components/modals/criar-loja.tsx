"use client";
import { useFormik } from "formik";
import { useState } from "react";
import LojaBase, { ImagensLoja, imagensLojasVazias } from "./loja-base";
import { lojaSchema, dadosVaziosLoja } from "../schema/loja-schema";
import { ModalService } from "../../services/ModalService";

interface CriaLojaProps {
  onClose: () => void;
  onSucesso?: () => void;
}

export default function CriaLoja({ onClose, onSucesso }: CriaLojaProps) {
  const [imagens, setImagens] = useState<ImagensLoja>(imagensLojasVazias);

  const formik = useFormik({
    initialValues: dadosVaziosLoja,
    validationSchema: lojaSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      let lojaId: number | null = null;

      try {
        // 1. Cria a loja
        const loja = await ModalService.criarLoja({
          nome: values.nome,
          descricao: values.descricao,
        });
        lojaId = loja.id;

        // 2. Faz upload das imagens (se tiver alguma)
        const temImagens = imagens.logo || imagens.banner || imagens.sticker;
        if (temImagens) {
          await ModalService.salvarImagensLoja(loja.id, imagens);
        }

        // 3. Tudo certo — fecha e atualiza
        onSucesso?.();
        onClose();
      } catch (err: unknown) {
        // Se a loja foi criada mas o upload falhou, deleta a loja
        if (lojaId !== null) {
          try {
            await ModalService.deletarLoja(lojaId);
          } catch (deleteErr) {
            console.error("Erro ao reverter criação da loja:", deleteErr);
          }
        }

        const msg = err instanceof Error ? err.message : "Erro ao criar loja.";
        setStatus(msg);
      } finally {
        setSubmitting(false);
      }
    },
  });

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
      <button
        type="button"
        onClick={() => formik.handleSubmit()}
        disabled={formik.isSubmitting}
        className="w-full py-3 rounded-2xl bg-violet-500 text-white font-semibold text-sm hover:bg-violet-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formik.isSubmitting ? "Criando..." : "Adicionar"}
      </button>
    </LojaBase>
  );
}