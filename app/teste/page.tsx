'use client';
import { useState } from "react";
import { axiosInstance } from "../services/ModalService";
import CriaProduto from "../produto/modal-cria-produto";
import EditaProduto from "../produto/modal-edita-produto";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  subcategoria: string;
  imagens: { url_imagem: string; ordem: number }[];
}

export default function Teste() {
  const [modalAberto, setModalAberto] = useState<"criar" | "editar" | null>(null);
  const [produto, setProduto] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const abrirEditar = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const { data } = await axiosInstance.get<any[]>("/produto");
      const raw = data[0];

      if (!raw) {
        setErro("Nenhum produto encontrado no banco.");
        return;
      }

      const { data: imagensDoProduto } = await axiosInstance.get<{ url_imagem: string; ordem: number }[]>(
        `/produto/${raw.id}/imagens`
      );

      const primeiro: Produto = {
        ...raw,
        subcategoria: String(raw.categoria_id),
        imagens: imagensDoProduto,
      };

      setProduto(primeiro);
      setModalAberto("editar");
    } catch {
      setErro("Erro ao carregar produto. Verifique se o token está correto.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 gap-4">
      <div className="flex gap-4">
        <button
          onClick={() => setModalAberto("criar")}
          className="px-5 py-3 rounded-2xl bg-violet-500 text-white font-semibold text-sm hover:bg-violet-600 transition-all"
        >
          Abrir Criar Produto
        </button>
        <button
          onClick={abrirEditar}
          disabled={carregando}
          className="px-5 py-3 rounded-2xl bg-white text-gray-800 font-semibold text-sm hover:bg-gray-100 border border-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {carregando ? "Carregando..." : "Abrir Editar Produto"}
        </button>
      </div>

      {erro && <p className="text-red-500 text-sm">{erro}</p>}

      {modalAberto === "criar" && (
        <CriaProduto
          lojaId={1}
          onClose={() => setModalAberto(null)}
          onSucesso={() => console.log("Produto criado com sucesso!")}
        />
      )}

      {modalAberto === "editar" && produto && (
        <EditaProduto
          produto={produto}
          onClose={() => { setModalAberto(null); setProduto(null); }}
          onSucesso={() => console.log("Produto atualizado/deletado com sucesso!")}
        />
      )}
    </div>
  );
}