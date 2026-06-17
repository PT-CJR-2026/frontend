"use client";

import Navbar from "@/app/components/layout/Navbar";
import HeroLoja from "@/app/components/layout/HeroLoja";

interface LojaData {
  id: number;
  nome: string;
  banner_url: string;
  usuario: {
    nome: string; // ✅ Agora pronto para receber o nome real do Back-end
  };
  avaliacoes: {
    nota: number;
  }[];
  produtos: {
    categoria_id: number;
  }[];
}

export default async function TesteHeroLojaPage() {
  const slugOuIdDaLoja = "6"; 

  const resLoja = await fetch(`http://127.0.0.1:3001/lojas/${slugOuIdDaLoja}`, {
    cache: "no-store",
  });

  if (!resLoja.ok) return <div className="text-center mt-20 text-red-500">Erro ao carregar a loja.</div>;

  const dadosLoja: LojaData = await resLoja.json();

  // Forçando o 4.75 apenas para você visualizar o corte perfeito da estrela.
  // Depois de testar, volte para a lógica da const notaMedia real!
  const notaMedia = 4.75; 

  let categoriaReal = "geral";
  const primeiroProduto = dadosLoja.produtos?.[0];

  if (primeiroProduto?.categoria_id) {
    try {
      const resCategoria = await fetch(`http://127.0.0.1:3001/categorias/${primeiroProduto.categoria_id}`, {
        cache: "no-store",
      });
      if (resCategoria.ok) {
        const dadosCategoria = await resCategoria.json();
        categoriaReal = dadosCategoria.nome;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F8F4] flex flex-col">
      <Navbar />

      <HeroLoja 
        nomeLoja={dadosLoja.nome}
        categoria={categoriaReal}
        nota={notaMedia} 
        bannerUrl={dadosLoja.banner_url}
        criador={dadosLoja.usuario?.nome || "Desconhecido"} // ✅ Passando o nome real
      />

      <div className="h-[500px] flex items-center justify-center">
        <p className="text-gray-400">Aqui entrarão os próximos componentes (Carrossel, etc)...</p>
      </div>
    </main>
  );
}