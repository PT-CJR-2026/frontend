import * as Yup from "yup";

export const produtoSchema = Yup.object({
  nome: Yup.string()
    .required("Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres"),

  descricao: Yup.string()
    .required("Descrição é obrigatória")
    .min(10, "Descrição deve ter pelo menos 10 caracteres"),

  preco: Yup.string()
    .required("Preço é obrigatório")
    .test(
      "greater-than-zero",
      "Preço deve ser maior que zero",
      (value) => Number(value?.replace(",", ".")) > 0
  ),

  estoque: Yup.number()
    .required("Estoque é obrigatório"),

  subcategoria: Yup.string()
    .required("Selecione uma subcategoria"),
});

export interface DadosProduto {
  nome: string;
  descricao: string;
  preco: string;
  estoque: string;
  subcategoria: string;
}

export const dadosVazios: DadosProduto = {
  nome: "",
  descricao: "",
  preco: "",
  estoque: "0",
  subcategoria: "",
};