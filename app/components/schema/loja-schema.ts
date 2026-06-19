import * as Yup from "yup";

export const lojaSchema = Yup.object({
  nome: Yup.string()
    .min(2, "Nome deve ter ao menos 2 caracteres")
    .max(255, "Nome muito longo")
    .required("Nome da loja é obrigatório"),

  descricao: Yup.string()
    .max(1000, "Descrição muito longa")
    .optional(),
});

export const dadosVaziosLoja = {
  nome: "",
  descricao: "",
};