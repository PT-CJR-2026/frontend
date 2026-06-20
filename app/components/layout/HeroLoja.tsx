import Image from "next/image";
import Link from "next/link";

interface HeroLojaProps {
  nomeLoja: string;
  categoria: string;
  nota: number;
  bannerUrl: string;
  criador: string;
  usernameCriador: string;
}

export default function HeroLoja({ 
  nomeLoja, 
  categoria, 
  nota, 
  bannerUrl, 
  criador,
  usernameCriador 
}: HeroLojaProps) {
  
const renderStars = (notaBase: number) => {
    const estrelas = [];
    const notaArredondada = Math.round(notaBase * 4) / 4; 

    for (let i = 1; i <= 5; i++) {
      const percentual = (() => {
        if (i <= Math.floor(notaArredondada)) return 100; 
        if (i === Math.ceil(notaArredondada)) return (notaArredondada % 1) * 100; 
        return 0; 
      })();

      estrelas.push(
        <div key={i} className="relative w-5 h-5 md:w-8 md:h-8 flex-shrink-0">
          
          {/* Estrela Base (Fundo) */}
          <svg className="absolute top-0 left-0 w-full h-full text-white/50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          
          {/* Estrela Amarela de Sobreposição (A Guilhotina Corrigida) */}
          {percentual > 0 && (
            <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${percentual}%` }}>
              <svg 
                className="absolute top-0 left-0 w-5 h-5 md:w-8 md:h-8 text-yellow-400 max-w-none" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          )}
        </div>
      );
    }
    return estrelas;
  };

  return (
    <section className="w-full relative aspect-[1440/539] flex flex-col items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerUrl}
          alt={`Banner da loja ${nomeLoja}`}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-transparent z-0"></div>

      {/* Alinhamento corrigido usando inline-flex */}
      <div className="relative z-10 px-4 w-full flex justify-center">
        <div className="inline-flex flex-col">
          <h1 
            className="text-white font-medium text-[50px] md:text-[90px] leading-none tracking-wide text-center"
            style={{ fontFamily: "'League Spartan', sans-serif" }}
          >
            {nomeLoja}
          </h1>

          <div className="flex items-center justify-between w-full mt-2 md:mt-3 px-1">
            <span 
              className="text-white text-xl md:text-3xl font-light lowercase"
              style={{ fontFamily: "'League Spartan', sans-serif" }}
            >
              {categoria}
            </span>
            
            <div className="flex gap-1">
              {renderStars(nota)}
            </div>
          </div>
        </div>
      </div>

      {criador && (
        <div className="absolute bottom-4 right-6 md:bottom-8 md:right-12 z-10">
          <span className="text-white/80 font-light text-sm md:text-lg">
            by <span className="text-white font-normal underline decoration-1 underline-offset-4">{criador}</span>
          </span>
        </div>
      )}

      {/* "by [nome]" clicável redireviona pra página de perfil */}
      {criador && usernameCriador && (
        <div className="absolute bottom-4 right-6 md:bottom-8 md:right-12 z-10">
          <span className="text-white/80 font-light text-sm md:text-lg">
            by{" "}
            <Link 
              href={`/perfil/${usernameCriador}`} 
              className="text-white font-normal underline decoration-1 underline-offset-4 hover:text-gray-300 transition-colors"
            >
              {criador}
            </Link>
          </span>
        </div>
      )}

    </section>
  );
}