import { axiosInstance } from "./BaseService";

export class UsuarioService {
  async getMe() {
    const response = await axiosInstance.get("/usuario/me");
    return response.data;
  }

  async alterarSenha(senha_antiga: string, nova_senha: string) {
    const response = await axiosInstance.patch("/usuario/atualizar-senha", {
      senha_antiga,
      nova_senha,
    });
    return response.data;
  }

  async alterarNome(nome: string) {
    const response = await axiosInstance.patch("/usuario/atualizar-nome", {
      nome,
    });
    return response.data;
  }

  async alterarUsername(username: string) {
    const response = await axiosInstance.patch("/usuario/atualizar-username", {
      username,
    });
    return response.data;
  }

  async alterarEmail(email: string) {
    const response = await axiosInstance.patch("/usuario/atualizar-email", {
      email,
    });
    return response.data;
  }

  async deletarConta() {
    const response = await axiosInstance.delete(`/usuario/me`);
    return response.data;
  }
}
