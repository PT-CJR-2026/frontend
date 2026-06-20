"use client";

import { useEffect, useRef, useState } from "react";
import CardProduto, { Produto } from "@/app/components/ui/CardProduto";
interface CarrosselCardProdutosProps {
  titulo: string;
  ordenacao: string;
  produtos: Produto[];
  onProductClick?: (produto: Produto) => void;
}
export default function CarrosselCardProdutos({
  titulo,
  ordenacao,
  produtos,
  onProductClick,
}: CarrosselCardProdutosProps) {
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
      {/* Cabeçalho */}
      <div className="mb-4 flex items-baseline gap-2.5">
        <h2 className="m-0 text-[30px] font-semibold text-[#111]">
          {titulo}
        </h2>
        {ordenacao && (
          <span className="text-sm font-medium text-[#6A38F3]">
            {ordenacao}
          </span>
        )}
      </div>
      {/* Cards */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onClickCapture={handleClickCapture}
        className={`flex gap-5 overflow-x-auto pt-1 pb-5 select-none
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {produtos.map((produto) => (
          <div key={produto.id} className="shrink-0">
            <CardProduto
              produto={produto}
              onClick={onProductClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
}