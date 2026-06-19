"use client";

import { useEffect, useState } from "react";

// Hook responsável por verificar se o usuário está autenticado na UI.
//
// IMPORTANTE: este hook NÃO gerencia requisições HTTP nem injeta tokens.
// Isso já é feito pelo BaseService (interceptors do axios).
//
// A única responsabilidade deste hook é:
// → Ler o localStorage para saber se existe um token salvo
// → Decodificar o payload do JWT para expor o username e id do usuário logado
// → Expor esses estados para os componentes decidirem o que renderizar
//    (ex: Navbar mostra "Login/Cadastre-se" ou "Perfil/Sair",
//         PerfilPage mostra botão "Editar Perfil" se for o dono,
//         AvaliacaoPage mostra lápis de editar se for o autor)
// → Expor uma função de logout que remove o token do localStorage

export function useAuth() {
  // Começa como false para evitar flash de conteúdo errado antes de ler o localStorage
  const [isLogado, setIsLogado] = useState(false);

  // Username do usuário logado, extraído do payload do JWT
  // null enquanto carrega ou se não estiver logado
  const [usernameLogado, setUsernameLogado] = useState<string | null>(null);

  // ID numérico do usuário logado, extraído do campo "sub" do JWT
  // null enquanto carrega ou se não estiver logado
  const [idLogado, setIdLogado] = useState<number | null>(null);

  // Controla se ainda está lendo o localStorage
  const [carregando, setCarregando] = useState(true);

  // Lê e decodifica o token do localStorage
  // Pode ser chamada manualmente após renovar o token (ex: após mudar username)
  function lerToken() {
    const token = localStorage.getItem("TOKEN_APLICACAO_FRONT");

    if (token) {
      setIsLogado(true);

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        const username =
          payload.username ?? payload.sub ?? payload.email ?? null;
        setUsernameLogado(username);

        // sub é o id do usuário no padrão JWT
        const id = payload.sub ?? null;
        setIdLogado(typeof id === "number" ? id : null);

      } catch {
        // Token mal-formado — trata como deslogado
        setIsLogado(false);
        setUsernameLogado(null);
        setIdLogado(null);
      }
    } else {
      setIsLogado(false);
      setUsernameLogado(null);
      setIdLogado(null);
    }

    setCarregando(false);
  }

  useEffect(() => {
    // useEffect roda apenas no browser (nunca no servidor),
    // por isso é seguro acessar o localStorage aqui
    lerToken();
  }, []);

  // Remove o token do localStorage e atualiza o estado da UI
  // O redirecionamento após logout fica na responsabilidade de quem chama
  function logout() {
    localStorage.removeItem("TOKEN_APLICACAO_FRONT");
    setIsLogado(false);
    setUsernameLogado(null);
    setIdLogado(null);
  }

  return { isLogado, usernameLogado, idLogado, carregando, logout, lerToken };
}