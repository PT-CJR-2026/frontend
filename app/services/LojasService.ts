import { ApiService, axiosInstance } from "@/app/services/BaseService";
import { Loja } from "../components/ui/CardLoja";

export class LojasService extends ApiService {
  constructor() {
    super("/lojas");
  }

  async getLojas(): Promise<Loja[]> {
    try {
      const response = await axiosInstance.get(this.url);
      return this.mapearLojas(response.data);
    } catch (error) {
      console.error("Erro ao buscar lojas:", error);
      return [];
    }
  }

  async getLojasPorCategoria(categoriaId: number): Promise<Loja[]> {
    try {
      const response = await axiosInstance.get(
        `${this.url}/categoria/${categoriaId}`
      );
      return this.mapearLojas(response.data);
    } catch (error) {
      console.error("Erro ao buscar lojas por categoria:", error);
      return [];
    }
  }

  private mapearLojas(data: any[]): Loja[] {
    return data.map((loja: any) => ({
      id: loja.id,
      nome: loja.nome,
      logoUrl: loja.logo_url || "/logosLojas/LogoCJR.png",
      categoria: loja.categoria || "Geral",
    }));
  }
}