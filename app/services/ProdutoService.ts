import { ApiService, axiosInstance } from "@/app/services/BaseService";
import { Produto, ImagemProduto } from "@/app/components/ui/CardProduto";

export class ProdutoService extends ApiService {
  constructor() {
    super("/produto");
  }

  // Por enquanto os três carrosséis usam o mesmo endpoint
  // Quando o backend tiver ordenação, ajustar aqui
  async getMelhoresAvaliados(): Promise<Produto[]> {
    const response = await axiosInstance.get(this.url);
    return response.data;
  }

  async getMaisBaratos(): Promise<Produto[]> {
    const response = await axiosInstance.get(this.url);
    return response.data;
  }

  async getRecemAdicionados(): Promise<Produto[]> {
    const response = await axiosInstance.get(this.url);
    return response.data;
  }

  async getPorCategoria(categoriaId: number): Promise<Produto[]> {
    const response = await axiosInstance.get(`${this.url}/categoria/${categoriaId}`);
    return response.data;
  }

  // Busca um único produto pelo id (usado na página de detalhes do produto)
  async getById(id: number): Promise<Produto> {
    const response = await axiosInstance.get(`${this.url}/${id}`);
    return response.data;
  }

  // O endpoint GET /produto/:id não inclui imagem_Produto no include do backend,
  // então as imagens precisam ser buscadas separadamente nesse endpoint dedicado.
  async getImagens(produtoId: number): Promise<ImagemProduto[]> {
    const response = await axiosInstance.get(`${this.url}/${produtoId}/imagens`);
    return response.data;
  }
}