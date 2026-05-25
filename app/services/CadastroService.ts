import { axiosInstance } from "./BaseService";

// ignora confirmação de senha pq não vai pro back
export interface CadastroData {
  nomeCompleto: string;
  username: string;
  email: string;
  senha_hash: string;
}

export class CadastroService {
  async cadastrar(dados: CadastroData): Promise<void> {
    // considerei a rota '/cadastro' no back
    await axiosInstance.post("/cadastro", dados);
  }
}