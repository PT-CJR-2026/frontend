import Image from "next/image";

// dados que o molde vai receber
interface HeroProps {
  tituloLinha1: string;
  tituloLinha2: string;
  imagemSrc: string;
  imagemAlt: string;
}

export default function Hero({
  tituloLinha1,
  tituloLinha2,
  imagemSrc,
  imagemAlt,
}: HeroProps) {
  return (
    // Container principal
    <section className="w-full bg-black flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-12 overflow-hidden relative">
      
      {/* Lado Esquerdo: molde para strings */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start z-10">
        <h1 className="text-white font-semibold text-center md:text-left flex flex-col" style={{ fontFamily: "'League Spartan', sans-serif" }}>
          <span className="text-[69.59px] leading-none">
            {tituloLinha1}
          </span>
          <span className="text-[66.4px] leading-none mt-2">
            {tituloLinha2}
          </span>
        </h1>
      </div>

      {/* Lado Direito: molde para mascote */}
      <div className="relative w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
        <div className="relative w-[300px] md:w-[450px] h-[300px] md:h-[400px]">
          <Image
            src={imagemSrc}
            alt={imagemAlt}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      
    </section>
  );
}