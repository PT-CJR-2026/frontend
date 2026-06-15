import { ApiService, axiosInstance } from "./BaseService";
import type { Avaliacao } from "../components/ui/CarrosselAvaliacao";

export interface UsuarioResumo {
  id: number;
  username: string;
  nome: string;
  foto_perfil_url: string | null;
}

export interface ComentarioAvaliacaoApi {
  id: number;
  conteudo: string;
  usuario: UsuarioResumo;
  created_at: string;
}

export interface AvaliacaoProdutoApi {
  id: number;
  usuario_id: number;
  produto_id: number;
  nota: number;
  comentario: string | null;
  created_at: string;
  updated_at: string;
  usuario: UsuarioResumo;
  comentario_avaliacao?: ComentarioAvaliacaoApi[];
}

export interface CreateAvaliacaoProdutoPayload {
  produto_id: number;
  nota: number;
  comentario?: string;
}

export type UpdateAvaliacaoProdutoPayload = Partial<
  Pick<CreateAvaliacaoProdutoPayload, "nota" | "comentario">
>;

export class AvaliacaoProdutoService extends ApiService {
  constructor() {
    super("/avaliacao-produto");
  }

  async findByProduto(produtoId: number): Promise<AvaliacaoProdutoApi[]> {
    const response = await axiosInstance.get<AvaliacaoProdutoApi[]>(
      `/avaliacao-produto/produto/${produtoId}`
    );
    return response.data;
  }

  async findCompleto(id: number): Promise<AvaliacaoProdutoApi> {
    const response = await axiosInstance.get<AvaliacaoProdutoApi>(
      `/avaliacao-produto/${id}/completo`
    );
    return response.data;
  }

  async create(data: CreateAvaliacaoProdutoPayload) {
    const response = await axiosInstance.post("/avaliacao-produto", data);
    return response.data;
  }

  async update(id: number, data: UpdateAvaliacaoProdutoPayload) {
    const response = await axiosInstance.patch(`/avaliacao-produto/${id}`, data);
    return response.data;
  }

  async remove(id: number) {
    const response = await axiosInstance.delete(`/avaliacao-produto/${id}`);
    return response.data;
  }
}

export interface AvaliacaoLojaApi {
  id: number;
  usuario_id: number;
  loja_id: number;
  nota: number;
  comentario: string | null;
  created_at: string;
  updated_at: string;
  usuario: UsuarioResumo;
  comentario_avaliacao?: ComentarioAvaliacaoApi[];
}

export interface CreateAvaliacaoLojaPayload {
  loja_id: number;
  nota: number;
  comentario?: string;
}

export type UpdateAvaliacaoLojaPayload = Partial<
  Pick<CreateAvaliacaoLojaPayload, "nota" | "comentario">
>;

export class AvaliacaoLojaService extends ApiService {
  constructor() {
    super("/avaliacao-loja");
  }

  async findByLoja(lojaId: number): Promise<AvaliacaoLojaApi[]> {
    const response = await axiosInstance.get<AvaliacaoLojaApi[]>(
      `/avaliacao-loja/loja/${lojaId}`
    );
    return response.data;
  }

  async findAll(): Promise<AvaliacaoLojaApi[]> {
    const response = await axiosInstance.get<AvaliacaoLojaApi[]>("/avaliacao-loja");
    return response.data;
  }

  async findOne(id: number): Promise<AvaliacaoLojaApi> {
    const response = await axiosInstance.get<AvaliacaoLojaApi>(`/avaliacao-loja/${id}`);
    return response.data;
  }

  async create(data: CreateAvaliacaoLojaPayload) {
    const response = await axiosInstance.post("/avaliacao-loja", data);
    return response.data;
  }

  async update(id: number, data: UpdateAvaliacaoLojaPayload) {
    const response = await axiosInstance.patch(`/avaliacao-loja/${id}`, data);
    return response.data;
  }

  async remove(id: number) {
    const response = await axiosInstance.delete(`/avaliacao-loja/${id}`);
    return response.data;
  }
}

export function mapAvaliacaoProdutoParaCard(avaliacao: AvaliacaoProdutoApi): Avaliacao {
  return {
    id: avaliacao.id,
    nomeUsuario: avaliacao.usuario?.nome ?? "Usuário",
    comentario: avaliacao.comentario,
    nota: avaliacao.nota,
    avatarUrl: avaliacao.usuario?.foto_perfil_url ?? null,
  };
}

export function mapAvaliacaoLojaParaCard(avaliacao: AvaliacaoLojaApi): Avaliacao {
  return {
    id: avaliacao.id,
    nomeUsuario: avaliacao.usuario?.nome ?? "Usuário",
    comentario: avaliacao.comentario,
    nota: avaliacao.nota,
    avatarUrl: avaliacao.usuario?.foto_perfil_url ?? null,
  };
}