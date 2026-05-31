"use client";

import { useEffect, useState } from "react";

// Hook responsável por verificar se o usuário está autenticado na UI.
//
// IMPORTANTE: este hook NÃO gerencia requisições HTTP nem injeta tokens.
// Isso já é feito pelo BaseService (interceptors do axios).
//
// A única responsabilidade deste hook é:
// → Ler o localStorage para saber se existe um token salvo
// → Expor esse estado para os componentes decidirem o que renderizar
//    (ex: Navbar mostra "Login/Cadastre-se" ou "Perfil/Sair")
// → Expor uma função de logout que remove o token do localStorage

export function useAuth() {
  // Começa como false para evitar flash de conteúdo errado antes de ler o localStorage
  const [isLogado, setIsLogado] = useState(false);

  // Controla se ainda está lendo o localStorage (evita renderizar a Navbar antes de saber o estado)
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // useEffect roda apenas no browser (nunca no servidor),
    // por isso é seguro acessar o localStorage aqui
    const token = localStorage.getItem("TOKEN_APLICACAO_FRONT");
    setIsLogado(!!token); // true se token existir, false se não
    setCarregando(false);
  }, []); // Roda uma única vez quando o componente monta

  // Remove o token do localStorage e atualiza o estado da UI
  // O redirecionamento após logout fica na responsabilidade de quem chama
  function logout() {
    localStorage.removeItem("TOKEN_APLICACAO_FRONT");
    setIsLogado(false);
  }

  return { isLogado, carregando, logout };
}
