import Navbar from "@/app/components/layout/Navbar";
import HeroLoja from "@/app/components/layout/HeroLoja";

// ✅ 1. Força o Next.js a nunca gerar essa página de forma estática no build
export const dynamic = "force-dynamic"; 

interface LojaData {
  id: number;
  nome: string;
  banner_url: string;
  categoria: string | null; 
  usuario: {
    nome?: string; 
    username: string;
  };
  avaliacoes: {
    nota: number;
  }[];
}

export default async function TesteHeroLojaPage() {
  const slugOuIdDaLoja = "6"; 

  // ✅ 2. Adicionamos um timestamp na URL para enganar o cache do Next.js
  // O Next vai achar que é uma URL inédita e será OBRIGADO a ir no Back-end buscar o JSON novo
  const resLoja = await fetch(`http://127.0.0.1:3001/lojas/${slugOuIdDaLoja}?t=${new Date().getTime()}`, {
    cache: "no-store",
  });

  if (!resLoja.ok) return <div className="text-center mt-20 text-red-500">Erro ao carregar a loja.</div>;

  const dadosLoja: LojaData = await resLoja.json();

  const totalNotas = dadosLoja.avaliacoes?.reduce((acc, av) => acc + av.nota, 0) || 0;
  const qtdAvaliacoes = dadosLoja.avaliacoes?.length || 0;
  const notaMedia = qtdAvaliacoes > 0 ? totalNotas / qtdAvaliacoes : 0;

  return (
    <main className="min-h-screen bg-[#F8F8F4] flex flex-col">
      <Navbar />

      <HeroLoja 
        nomeLoja={dadosLoja.nome}
        categoria={dadosLoja.categoria || "Geral"} 
        nota={notaMedia} 
        bannerUrl={dadosLoja.banner_url}
        criador={dadosLoja.usuario?.nome || dadosLoja.usuario?.username || "Desconhecido"}
        usernameCriador={dadosLoja.usuario?.username || ""}
      />

      <div className="h-[500px] flex items-center justify-center">
        <p className="text-gray-400">Aqui entrarão os próximos componentes (Carrossel, etc)...</p>
      </div>
    </main>
  );
}