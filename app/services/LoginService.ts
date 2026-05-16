import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001"
});

export class LoginService {
    async login(email: string, senha: string): Promise<void> {
        const response = await axiosInstance.post("/login", {
            email,
            senha_hash: senha, 
    });
    const { access_token } = response.data;
    localStorage.setItem("TOKEN_APLICACAO_FRONT", access_token);
  }
}