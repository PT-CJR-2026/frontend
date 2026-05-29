import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001"
})
 
export class ApiService{
    
    url: string;

    constructor(url: string){
        this.url = url; 

        axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem('TOKEN_APLICACAO_FRONT');
            const authRequestToken = token ? `Bearer ${token}` : '';
            config.headers['Authorization'] = authRequestToken;
            return config;
        },
            (error) => Promise.reject(error)
        );
        
        axiosInstance.interceptors.response.use((response) =>{
            return response;
        }, async (erro) => {
            const originalConfig = erro.config;
            console.log(erro.response.status);
            if (erro.response.status == 401) {
                localStorage.removeItem('TOKEN_APLICACAO_FRONT');
                window.location.reload();
            }
            return Promise.reject(erro);
        });
    }
}