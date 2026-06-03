import axios from "axios";
import { createClient } from "@supabase/supabase-js";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001"
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("TOKEN_APLICACAO_FRONT");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function uploadImagem(file: File, produtoId: number, ordem: number): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `produtos/${produtoId}/${ordem}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("imagem-produto")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw new Error(`Falha no upload da imagem ${ordem}: ${error.message}`);

  return supabase.storage.from("imagem-produto").getPublicUrl(path).data.publicUrl;
}

async function deletarImagem(url: string): Promise<void> {
  const path = url.split("/imagem-produto/")[1];
  const { error } = await supabase.storage.from("imagem-produto").remove([path]);
  if (error) throw new Error(`Falha ao deletar imagem: ${error.message}`);
}

export interface CriarProdutoDto {
  loja_id: number;
  categoria_id: number | string;
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
}

export interface ImagensProdutoDto {
  principal: File | null;
  secundarias: (File | null)[];
}

async function criarProduto(dto: CriarProdutoDto): Promise<{ id: number }> {
  const { data } = await axiosInstance.post("/produto", dto);
  return data;
}

async function atualizarProduto(produtoId: number, dto: Partial<CriarProdutoDto>): Promise<void> {
  await axiosInstance.patch(`/produto/${produtoId}`, dto);
}

async function deletarProduto(produtoId: number): Promise<void> {
  const { data: imagens } = await axiosInstance.get<{ url_imagem: string }[]>(
    `/produto/${produtoId}/imagens`
  );

  if (imagens.length > 0) {
    await Promise.all(imagens.map((i) => deletarImagem(i.url_imagem)));
  }

  await axiosInstance.delete(`/produto/${produtoId}`);
}

async function salvarImagensProduto(produtoId: number, imagens: ImagensProdutoDto): Promise<void> {
  const todasImagens: { file: File; ordem: number }[] = [];

  if (imagens.principal) {
    todasImagens.push({ file: imagens.principal, ordem: 1 });
  }
  imagens.secundarias.forEach((file, i) => {
    if (file) todasImagens.push({ file, ordem: i + 2 });
  });

  if (todasImagens.length === 0) return;

  const uploads = todasImagens.map(({ file, ordem }) =>
    uploadImagem(file, produtoId, ordem).then((url_imagem) => ({ url_imagem, ordem }))
  );
  const imagensUpadas = await Promise.all(uploads);

  await Promise.all(
    imagensUpadas.map(({ url_imagem, ordem }) =>
      axiosInstance.post(`/produto/${produtoId}/imagens`, {
        produto_id: produtoId,
        url_imagem,
        ordem
      })
    )
  );
}

async function atualizarImagensProduto(
  produtoId: number,
  novas: ImagensProdutoDto,
  urlsRemovidas: string[]
): Promise<void> {
  if (urlsRemovidas.length > 0) {
    await Promise.all(urlsRemovidas.map(deletarImagem));
    await Promise.all(
      urlsRemovidas.map((url) =>
        axiosInstance.delete(`/produto/${produtoId}/imagens`, { data: { url_imagem: url } })
      )
    );
  }

  await salvarImagensProduto(produtoId, novas);
}

export const ModalService = {
  criarProduto,
  atualizarProduto,
  deletarProduto,
  salvarImagensProduto,
  atualizarImagensProduto,
};