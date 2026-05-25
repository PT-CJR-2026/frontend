interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  onBack?: () => void;
}

export function Modal({ onClose, children, onBack }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose} // clique no overlay fecha
    >
      <div
        className="relative bg-[#ebebeb] rounded-3xl p-10 shadow-lg"
        style={{ width: "654px", height: "802px" }}
        onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
      >
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-6 left-7 text-gray-500 text-2xl leading-none hover:text-gray-700"
          >
            ‹
          </button>
        )}
        <button
          onClick={onClose}
          className="absolute top-6 right-7 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
