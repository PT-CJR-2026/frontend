import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import LinkText from "@/app/components/ui/LinkText";
import Image from "next/image";
import Link from "next/link";
import * as Yup from 'yup';

export default function LoginPage() {
    return(
        <div className="h-screen flex flex-col md:flex-row bg-[#F6F3E4] font-sans overflow-hidden">
             <div className="hidden md:flex flex-1 flex-col items-center justify-start relative pt-0">
        {/* LOGO */}
        <div className="w-[421px] max-w-full relative -mt-[60px]">
                    <Link href={"/"}>
                        <Image 
                        src="/LOGO Stock.io.svg" 
                        alt="Stock.IO Logo" 
                        width={421} 
                        height={267} 
                        className="object-contain"
                        priority
                        />
                    </Link>
                  </div>

            {/* BONECO */}
            <div className="w-[497px] max-w-full relative h-[70vh]">
            <Image
                src="/Stockles - Mascote da Stock.io.png"
                alt="Mascote"
                priority
                width={497}
                height={1129}
                style={{ height: "auto" }}
            />
            </div>
        </div>
            {/* Coluna Direita: LOGIN */}
            <div className="w-full lg:w-[50%] min-h-screen flex flex-col pt-[50px] pl-[85px] z-10">
                {/* CARD ESCURO */}
                <div className="bg-[#171918] w-full max-w-[654px] flex-1 p-12 sm:p-16 shadow-2xl flex flex-col rounded-t-[48px] rounded-b-none overflow-hidden">
                    <div className="flex flex-col gap-10">
                        <h2 className="text-[#F6F3E4] font-bold text-4xl mb-3 uppercase text-center">Bem vindo de volta!</h2>
                        <Input 
                        placeholder="Email"
                        className="bg-[#F6F3E4] text-black
                        placeholder:text-gray-400"
                        />
                        <Input 
                        placeholder="Senha"
                        className="bg-[#F6F3E4] 
                        text-black
                        placeholder:text-gray-400"
                        hasToggle />
                        <div className="text-center text-lg text-gray-300">
                            <LinkText>Esqueceu sua senha?</LinkText>
                        </div>
                        <Button>Entrar</Button>
                        <div className="text-xl">
                            Não possui uma conta? &nbsp;
                            <Link href="/cadastro">
                                <LinkText className="text-[#6A38F3] text-xl">
                                    Cadastre-se
                                </LinkText>
                            </Link>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
}
