import { ApiService, axiosInstance } from "@/app/services/BaseService";
import { Loja } from "../components/ui/CardLoja";

export class LojasService extends ApiService {
  constructor() {
    super("/lojas"); 
  }

  async getLojas(categorias?: string[]): Promise<Loja[]> {
    try {
      const params = categorias && categorias.length > 0 
        ? { categorias: categorias.join(',') } 
        : {};

      const response = await axiosInstance.get(this.url, { params });

        const lojasMapeadas = response.data.map((loja: any) => ({
        id: loja.id,
        nome: loja.nome,
        logoUrl: loja.logo_url || "/logosLojas/LogoCJR.png",
        // define um valor temporário para a categoria caso o backend ainda não esteja enviando
        categoria: loja.categoria || "Geral", 
        }));
      
      return lojasMapeadas;

    } catch (error) {
      console.error("Erro ao buscar lojas:", error);
      return []; //retorna array vazio em caso de erro para não quebrar a tela
    }
  }
}