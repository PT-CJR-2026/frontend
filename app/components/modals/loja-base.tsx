"use client";
import { FormikProps } from "formik";
import { useRef, useEffect, useState } from "react";
import { axiosInstance } from "../../services/ModalService";

export interface ImagensLoja {
  logo: File | null;
  banner: File | null;
  sticker: File | null;
}

export const imagensLojasVazias: ImagensLoja = {
  logo: null,
  banner: null,
  sticker: null,
};

interface Categoria {
  id: number;
  nome: string;
}

interface LojaBaseProps {
  formik: FormikProps<any>;
  onClose: () => void;
  imagens: ImagensLoja;
  onImagensChange: (imagens: ImagensLoja) => void;
  children?: React.ReactNode;
}

interface UploadAreaProps {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
}

function UploadArea({ label, file, onChange, accept = "image/*" }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="border-2 border-dashed border-violet-400 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-violet-50 transition-colors min-h-[80px]"
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0] ?? null;
          onChange(f);
        }}
      />

      {file ? (
        <div className="flex flex-col items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <polyline points="16 13 12 9 8 13" />
            <line x1="12" y1="9" x2="12" y2="17" />
          </svg>
          <span className="text-xs text-violet-600 font-medium text-center truncate max-w-[180px]">
            {file.name}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <polyline points="16 13 12 9 8 13" />
            <line x1="12" y1="9" x2="12" y2="17" />
          </svg>
          <span className="text-xs text-gray-500 text-center">{label}</span>
        </div>
      )}
    </div>
  );
}

export default function LojaBase({
  formik,
  onClose,
  imagens,
  onImagensChange,
  children,
}: LojaBaseProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/categoria")
      .then((res) => {
        // filtra só categorias raiz (sem pai)
        const principais = res.data.filter(
          (c: Categoria & { categoria_pai_id: number | null }) =>
            c.categoria_pai_id === null
        );
        setCategorias(principais);
      })
      .catch(() => setCategorias([]));
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md mx-4 p-8 relative">

        {/* Botão fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Fechar modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Adicionar loja
        </h2>

        <div className="flex flex-col gap-3">

          {/* Nome da loja */}
          <div>
            <input
              type="text"
              name="nome"
              placeholder="Nome da loja"
              value={formik.values.nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full h-12 rounded-full border border-gray-200 px-5 text-sm outline-none focus:border-violet-500 transition-colors"
            />
            {formik.touched.nome && formik.errors.nome && (
              <p className="text-red-500 text-xs mt-1 pl-4">{String(formik.errors.nome)}</p>
            )}
          </div>

          {/* Descrição */}
          <div>
            <textarea
              name="descricao"
              placeholder="Descrição da loja (opcional)"
              value={formik.values.descricao}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
              className="w-full rounded-2xl border border-gray-200 px-5 py-3 text-sm outline-none focus:border-violet-500 transition-colors resize-none"
            />
            {formik.touched.descricao && formik.errors.descricao && (
              <p className="text-red-500 text-xs mt-1 pl-4">{String(formik.errors.descricao)}</p>
            )}
          </div>

          {/* Categoria */}
          <div className="relative">
            <select
              name="categoria_id"
              value={formik.values.categoria_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full h-12 rounded-full border border-gray-200 px-5 text-sm outline-none appearance-none focus:border-violet-500 transition-colors ${
                formik.values.categoria_id === "" ? "text-gray-400" : "text-gray-800"
              }`}
            >
              <option value="" disabled>Categoria</option>
              {categorias.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.nome}
                </option>
              ))}
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
            {formik.touched.categoria_id && formik.errors.categoria_id && (
              <p className="text-red-500 text-xs mt-1 pl-4">{String(formik.errors.categoria_id)}</p>
            )}
          </div>

          {/* Uploads */}
          <div className="flex flex-col gap-2 mt-1">
            <UploadArea
              label="Anexe a foto de perfil de sua loja"
              file={imagens.logo}
              onChange={(f) => onImagensChange({ ...imagens, logo: f })}
            />
            <UploadArea
              label="Anexe a logo em SVG de sua loja"
              file={imagens.sticker}
              onChange={(f) => onImagensChange({ ...imagens, sticker: f })}
              accept=".svg,image/svg+xml"
            />
            <UploadArea
              label="Anexe o banner de sua loja"
              file={imagens.banner}
              onChange={(f) => onImagensChange({ ...imagens, banner: f })}
            />
          </div>

          {/* Slot para botão e erros do pai */}
          {children}
        </div>
      </div>
    </div>
  );
}