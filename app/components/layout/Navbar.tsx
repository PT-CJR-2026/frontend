import React from "react";
import Button from "@/app/components/ui/Button";
import LinkText from "@/app/components/ui/LinkText";
import Link from "next/link";

interface NavbarProps {
  logoSrc?: string;
  logoAlt?: string;
}
 
const Navbar: React.FC<NavbarProps> = ({
  logoSrc,
  logoAlt = "Logo",
}) => {
  return (
    <nav
      className="w-full bg-[#000000] px-8 border-b border-white/5"
      style={{ height: 92 }}
    >
      <div className="h-full max-w-7x1 mx-auto flex items-center justify-between">
 
        {/* Logo */}
        <div className="flex items-center">
          {logoSrc ? (
              <Link href={"/"}>
                <img
                src={logoSrc}
                alt={logoAlt}
                className="h-9 w-auto object-contain"
                />
              </Link>
          ) : (
            <div className="h-9 w-36 rounded-md border border-dashed border-white/20 flex items-center justify-center">
              <span className="text-xs text-white/30 select-none tracking-widest uppercase">
                Logo
              </span>
            </div>
          )}
        </div>
 
        {/* Ações */}
        {/* Falta adicionar a condicional de logado e as rotas do usuario logado */}
        {/* Após concluir as entregas melhorar a responsividade */}
        <div className="flex items-center gap-10">
          {/* Login */}
          <Link href="/login">
            <LinkText
                className="
                text-white text-sm font-semibold tracking-widest uppercase
                hover:text-[#6A38F3]
                "

            >
                Login
            </LinkText>
          </Link>
 
          {/* Cadastrar */}
          <Link href={"/cadastro"}>
            <Button
                variant="primary"
                className="
                    !w-auto !py-2 px-6
                    !text-sm !font-bold tracking-widest uppercase
                    hover:!bg-white
                    hover:!text-[#6A38F3]
                    transition-colors
                "
            >
                Cadastre-se
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
 
export default Navbar;