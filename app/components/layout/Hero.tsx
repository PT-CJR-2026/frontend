import Image from "next/image";

// implementação utilizando slug
const heroConteudos: Record<string, { titulo1: string; titulo2: string; img: string; alt: string }> = {
  "home": {
    titulo1: "Do CAOS à organização,",
    titulo2: "em alguns cliques",
    img: "/mascote-hero.png",
    alt: "Mascote roxa organizando caixas",
  },
};

interface HeroProps {
  slug?: string;
  tituloLinha1?: string;
  tituloLinha2?: string;
  imagemSrc?: string;
  imagemAlt?: string;
}

export default function Hero({ slug, tituloLinha1, tituloLinha2, imagemSrc, imagemAlt }: HeroProps) {
  const conteudo = tituloLinha1
    ? { titulo1: tituloLinha1, titulo2: tituloLinha2 ?? "", img: imagemSrc ?? "", alt: imagemAlt ?? "" }
    : heroConteudos[slug ?? ""] || heroConteudos["home"];

  return (
    <section className="w-full bg-black flex justify-center relative h-auto md:h-[447px] overflow-hidden">
      <div className="w-full max-w-[1200px] px-8 flex flex-col md:flex-row items-center justify-between relative h-full">
      
        {/* lado esquerdo: seleciona a string */}
        <div className="w-full md:w-1/2 flex justify-center z-10">
          <h1 className="text-white font-semibold text-right flex flex-col items-end whitespace-nowrap mb-[43px]" style={{ fontFamily: "'League Spartan', sans-serif" }}>
            <span className="text-[69.59px] leading-none">
              {conteudo.titulo1}
            </span>
            <span className="text-[66.4px] leading-none -mt-[10px] mb-[30px] mr-[15px]">
              {conteudo.titulo2}
            </span>
          </h1>
        </div>

        {/* lado direito: seleciona o mascote */}
        <div className="relative w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
          <div className="relative w-[300px] md:w-[572.22px] h-[300px] md:h-[777px] top-[160px]">
            <Image
              src={conteudo.img}
              alt={conteudo.alt}
              fill
              className="object-contain md:object-top"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}