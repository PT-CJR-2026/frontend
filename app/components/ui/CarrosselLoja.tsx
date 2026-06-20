"use client";
import { useEffect, useRef, useState } from "react";
import { CardLoja, Loja } from "./CardLoja";

interface CarrosselLojaProps {
  titulo?: string;
  Lojas: Loja[];
  onLojaClick?: (loja: Loja) => void;
  acaoCabecalho?: React.ReactNode;
}

export default function CarrosselLoja({
  titulo,
  Lojas,
  onLojaClick,
  acaoCabecalho,
}: CarrosselLojaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({ startX: 0, scrollLeft: 0 });
  const movedRef = useRef(false);
  const DRAG_THRESHOLD = 5;

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(true);
    movedRef.current = false;
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
      if (Math.abs(delta) > DRAG_THRESHOLD) {
        movedRef.current = true;
      }
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

  const handleClickCapture = (e: React.MouseEvent) => {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      movedRef.current = false;
    }
  };

  return (
    <section className="w-full">
      {/* Cabeçalho Flex: Título na esquerda, Ação (Botão) na direita */}
      {(titulo || acaoCabecalho) && (
        <div className="mb-6 flex items-center justify-between">
          {titulo && (
            <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
              {titulo}
            </h2>
          )}

          {/* Se a página passar um botão, ele renderiza aqui */}
          {acaoCabecalho && <div>{acaoCabecalho}</div>}
        </div>
      )}

      {/* Container do Carrossel */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onClickCapture={handleClickCapture}
        className={`flex gap-8 overflow-x-auto py-4 pl-1 select-none
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {Lojas.map((loja) => (
          <div key={loja.id} className="shrink-0">
            <CardLoja loja={loja} onClick={() => onLojaClick?.(loja)} />
          </div>
        ))}
      </div>
    </section>
  );
}