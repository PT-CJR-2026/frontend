import { ApiService, axiosInstance } from "@/app/services/BaseService";
import { Produto } from "@/app/components/ui/CardProduto";

export class ProdutoService extends ApiService {
  constructor() {
    super("/produto");
  }

  async getMelhoresAvaliados(): Promise<Produto[]> {
    const response = await axiosInstance.get(`${this.url}/melhores-avaliados`);
    return response.data;
  }

  async getMaisBaratos(): Promise<Produto[]> {
    const response = await axiosInstance.get(`${this.url}/mais-baratos`);
    return response.data;
  }

  async getRecemAdicionados(): Promise<Produto[]> {
    const response = await axiosInstance.get(`${this.url}/recem-adicionados`);
    return response.data;
  }

  async getPorCategoria(categoriaId: number): Promise<Produto[]> {
    const response = await axiosInstance.get(
      `${this.url}/categoria/${categoriaId}`
    );
    return response.data;
  }
}