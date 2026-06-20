"use client";

interface NotaEstrelaProps {
  nota: number; // 0 a 5
  tamanho?: number;
}

export default function NotaEstrela({ nota, tamanho = 16 }: NotaEstrelaProps) {
  const estrelas = [1, 2, 3, 4, 5];

  return (
    <span className="inline-flex items-center gap-[1px]" aria-label={`${nota.toFixed(1)} de 5 estrelas`}>
      {estrelas.map((i) => {
        const preenchida = i <= Math.round(nota);
        return (
          <svg
            key={i}
            width={tamanho}
            height={tamanho}
            viewBox="0 0 24 24"
            fill={preenchida ? "#FFC400" : "none"}
            stroke="#FFC400"
            strokeWidth={1.5}
          >
            <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 7.1-1.01L12 2z" />
          </svg>
        );
      })}
    </span>
  );
}