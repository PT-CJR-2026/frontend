import { ApiService, axiosInstance } from "@/app/services/BaseService";
import { Produto } from "@/app/components/ui/CardProduto";

export class ProdutoService extends ApiService {
  constructor() {
    super("/produto");
  }

  // Por enquanto os três carrosséis usam o mesmo endpoint
  // Quando o backend tiver ordenação, ajusta aqui
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
}
