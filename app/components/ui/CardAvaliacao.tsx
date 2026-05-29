import React from "react";

interface CardAvaliacaoProps
  extends React.HTMLAttributes<HTMLDivElement> {
  nomeUsuario: string;
  comentario?: string | null;
  nota: number;
  avatarUrl?: string | null;
}

const PLACEHOLDER_AVATAR =
  "https://placehold.co/120x120/f5f5f5/aaa?text=U";

export default function CardAvaliacao({
  nomeUsuario,
  comentario,
  nota,
  avatarUrl,
  className = "",
  ...props
}: CardAvaliacaoProps) {
  const estrelas = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div
        className={`bg-white flex items-start shadow-sm${className}`}
        style={{
            padding: "32px",
            minHeight: "180px",
            gap: "24px",
            width: "930px",
            borderRadius: "32px",
        }}
    >
      {/* Avatar */}
      <div
        className="rounded-full"
        style={{
          width: "120px",
          height: "120px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={avatarUrl ?? PLACEHOLDER_AVATAR}
          alt={nomeUsuario}
          style={{
            width: "120px",
            height: "120px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col justify-center flex-1 gap-3">
        <p
          className="font-semibold text-2xl text-black"
          style={{
            fontFamily: "'League Spartan', sans-serif",
          }}
        >
          {nomeUsuario}
        </p>

        {comentario && (
          <p
            className="text-lg text-gray-600 leading-relaxed"
            style={{
              fontFamily: "'League Spartan', sans-serif",
            }}
          >
            {comentario}
          </p>
        )}
      </div>

      {/* Estrelas */}
      <div
        className="flex gap-1 shrink-0"
        style={{ transform: "translateY(-6px)" }}
        >
        {estrelas.map((i) => (
          <span
            key={i}
            style={{
              fontSize: "40px",
              color: i <= nota ? "#FFEB3A" : "#D1D5DB",
            }}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}