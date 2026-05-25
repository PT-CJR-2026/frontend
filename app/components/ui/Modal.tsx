"use client";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  onBack?: () => void;
}

export function Modal({ onClose, children, onBack }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-[#e8e8e8] rounded-3xl shadow-xl"
        style={{ width: "654px", height: "802px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão voltar — canto superior esquerdo */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-7 left-8 text-gray-400 hover:text-gray-600 transition text-2xl font-light leading-none"
          >
            ‹
          </button>
        )}

        {/* Botão fechar — canto superior direito */}
        <button
          onClick={onClose}
          className="absolute top-7 right-8 text-gray-400 hover:text-gray-600 transition"
        >
          <svg width="33" height="33" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 1L15 15M15 1L1 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Conteúdo centralizado */}
        <div className="flex flex-col items-center justify-center h-full px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
