import React, { useState } from "react";
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
  //Mock para testar a navbarlogada e deslogada
  const loading = false;
  const [usuario, setUsuario] = useState(true);

  const logout = () => {
    setUsuario(false);
  };

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
        
        
        {!loading &&(
          <>
            {usuario ? (
              <div className="flex items-center gap-10">
                {/* Ações com login */}
                {/* Após concluir as entregas melhorar a responsividade */}
                {/* Perfil do usuário */}
                <Link href={"/login"}>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 35 35"
                  className="h-9 w-auto text-[#FFFFFF] hover:text-[#6A38F3] cursor-pointer"
                  fill="currentColor"
                  >
                    <path d="M22.7395 4.41465C21.4092 2.97842 19.5512 2.1875 17.5004 2.1875C15.4387 2.1875 13.5745 2.97363 12.2504 4.40098C10.9119 5.84404 10.2598 7.80527 10.4129 9.92305C10.7164 14.1012 13.8958 17.5 17.5004 17.5C21.105 17.5 24.2789 14.1019 24.5872 9.92441C24.7424 7.82578 24.0861 5.86865 22.7395 4.41465ZM29.5316 32.8125H5.46914C5.15419 32.8166 4.84228 32.7504 4.55611 32.6188C4.26994 32.4872 4.01671 32.2935 3.81484 32.0517C3.37051 31.5205 3.19141 30.7952 3.32402 30.0617C3.90098 26.8611 5.70156 24.1726 8.53164 22.2852C11.0459 20.6097 14.2308 19.6875 17.5004 19.6875C20.77 19.6875 23.9549 20.6104 26.4691 22.2852C29.2992 24.1719 31.0998 26.8604 31.6768 30.061C31.8094 30.7945 31.6303 31.5198 31.1859 32.051C30.9841 32.2929 30.7309 32.4868 30.4448 32.6185C30.1586 32.7502 29.8467 32.8165 29.5316 32.8125Z"/>
                  </svg>
                </Link>

                {/* Deslogar - Sair */}
                {/* Tá mockado */}
                {/* Button e button ficou bem ruim, achei que o react tava quebrado */}
                <button onClick={logout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 35 35"
                    className="h-9 w-auto text-[#FFFFFF] hover:text-[#FF0000] cursor-pointer"
                    fill="currentColor"
                  >
                    <path d="M8.75 3.75C7.42392 3.75 6.15215 4.27678 5.21447 5.21447C4.27678 6.15215 3.75 7.42392 3.75 8.75V26.25C3.75 27.5761 4.27678 28.8479 5.21447 29.7855C6.15215 30.7232 7.42392 31.25 8.75 31.25H21.25C21.5815 31.25 21.8995 31.1183 22.1339 30.8839C22.3683 30.6495 22.5 30.3315 22.5 30C22.5 29.6685 22.3683 29.3505 22.1339 29.1161C21.8995 28.8817 21.5815 28.75 21.25 28.75H8.75C8.08696 28.75 7.45107 28.4866 6.98223 28.0178C6.51339 27.5489 6.25 26.913 6.25 26.25V8.75C6.25 8.08696 6.51339 7.45107 6.98223 6.98223C7.45107 6.51339 8.08696 6.25 8.75 6.25H21.25C21.5815 6.25 21.8995 6.1183 22.1339 5.88388C22.3683 5.64946 22.5 5.33152 22.5 5C22.5 4.66848 22.3683 4.35054 22.1339 4.11612C21.8995 3.8817 21.5815 3.75 21.25 3.75H8.75ZM25.2588 9.74125C25.1434 9.62186 25.0055 9.52663 24.853 9.46112C24.7005 9.39561 24.5365 9.36113 24.3705 9.35969C24.2045 9.35824 24.0399 9.38987 23.8863 9.45272C23.7327 9.51557 23.5931 9.60839 23.4758 9.72576C23.3584 9.84312 23.2656 9.98269 23.2027 10.1363C23.1399 10.2899 23.1082 10.4545 23.1097 10.6205C23.1111 10.7865 23.1456 10.9505 23.2111 11.103C23.2766 11.2555 23.3719 11.3934 23.4912 11.5087L28.2325 16.25H12.5C12.1685 16.25 11.8505 16.3817 11.6161 16.6161C11.3817 16.8505 11.25 17.1685 11.25 17.5C11.25 17.8315 11.3817 18.1495 11.6161 18.3839C11.8505 18.6183 12.1685 18.75 12.5 18.75H28.2325L23.4912 23.4912C23.2636 23.727 23.1376 24.0428 23.1404 24.3705C23.1433 24.6982 23.2747 25.0118 23.5065 25.2435C23.7382 25.4753 24.0518 25.6067 24.3795 25.6096C24.7072 25.6124 25.023 25.4864 25.2588 25.2588L32.1338 18.3837C32.3681 18.1493 32.4997 17.8315 32.4997 17.5C32.4997 17.1685 32.3681 16.8507 32.1338 16.6163L25.2588 9.74125Z"/>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-10">

                {/* Ações sem login */}
                {/* Após concluir as entregas melhorar a responsividade */}
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
            )}
          </>
        )}

      </div>
    </nav>
  );
};
 
export default Navbar;