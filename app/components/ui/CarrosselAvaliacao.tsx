"use client";

import { useEffect, useRef, useState } from "react";
import CardAvaliacao from "./CardAvaliacao";

export interface Avaliacao {
  id: string | number;
  nomeUsuario: string;
  comentario?: string | null;
  nota: number;
  avatarUrl?: string | null;
}

interface CarrosselAvaliacaoProps {
  titulo?: string;
  avaliacoes: Avaliacao[];
  acaoCabecalho?: React.ReactNode;
}

export default function CarrosselAvaliacao({
  titulo,
  avaliacoes,
  acaoCabecalho,
}: CarrosselAvaliacaoProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({ startX: 0, scrollLeft: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(true);
    dragInfo.current = {
      startX: e.clientX,
      scrollLeft: container.scrollLeft,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent) => {
      const container = scrollRef.current;
      if (!container) return;
      const delta = e.clientX - dragInfo.current.startX;
      container.scrollLeft = dragInfo.current.scrollLeft - delta;
    };

    const stopDragging = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [isDragging]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (!e.shiftKey) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section className="w-full">
      {/* Cabeçalho */}
      {(titulo || acaoCabecalho) && (
        <div className="mb-6 flex items-center justify-between">
          {titulo && (
            <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
              {titulo}
            </h2>
          )}

          {acaoCabecalho && <div>{acaoCabecalho}</div>}
        </div>
      )}

      {/* Container do Carrossel */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        className={`flex gap-8 overflow-x-auto scroll-auto py-4 pl-1 select-none
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {avaliacoes.map((avaliacao) => (
          <div key={avaliacao.id} className="shrink-0">
            <CardAvaliacao
              nomeUsuario={avaliacao.nomeUsuario}
              comentario={avaliacao.comentario}
              nota={avaliacao.nota}
              avatarUrl={avaliacao.avatarUrl}
            />
          </div>
        ))}
      </div>
    </section>
  );
}