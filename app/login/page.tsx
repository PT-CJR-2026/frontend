"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import LinkText from "@/app/components/ui/LinkText";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { LoginService } from "../services/LoginService";

const loginSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Email obrigatório"),
  senha: Yup.string().min(6, "Mínimo 6 caracteres").required("Senha obrigatória"),
});

const loginService = new LoginService();
 
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setApiError("");

    // Valida com Yup 
    try {
      await loginSchema.validate({ email, senha }, { abortEarly: false });
      setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const fieldErrors: { email?: string; senha?: string } = {};
        err.inner.forEach((e) => {
          if (e.path) fieldErrors[e.path as "email" | "senha"] = e.message;
        });
        setErrors(fieldErrors);
        return;
      }
    }

    // Chamada a API
    setLoading(true);
    try {
      await loginService.login(email, senha);
      router.push("/");
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 401) {
        setApiError("Email ou senha incorretos."); 
      } else {
        setApiError("Erro ao realizar login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-[#F6F3E4] font-sans overflow-hidden">
      {/* Coluna Esquerda */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-start relative pt-0">
        <div className="w-[421px] max-w-full relative -mt-[60px]">
          <Link href="/">
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

      {/* Coluna Direita */}
      <div className="w-full lg:w-[50%] min-h-screen flex flex-col pt-[50px] pl-[85px] z-10">
        <div className="bg-[#171918] w-full max-w-[654px] flex-1 p-12 sm:p-16 shadow-2xl flex flex-col rounded-t-[48px] rounded-b-none overflow-hidden">
          <div className="flex flex-col gap-10">
            <h2 className="text-[#F6F3E4] font-bold text-4xl mb-3 uppercase text-center">
              Bem vindo de volta!
            </h2>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Email"
                className="bg-[#F6F3E4] text-black placeholder:text-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="text-red-400 text-sm pl-1">{errors.email}</span>
              )}
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Senha"
                className="bg-[#F6F3E4] text-black placeholder:text-gray-400"
                hasToggle
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              {errors.senha && (
                <span className="text-red-400 text-sm pl-1">{errors.senha}</span>
              )}
            </div>

            {/* Erro da API */}
            {apiError && (
              <p className="text-red-400 text-sm text-center -mt-4">{apiError}</p>
            )}

            <div className="text-center text-lg text-gray-300">
              <LinkText>Esqueceu sua senha?</LinkText>
            </div>

            <Button onClick={handleLogin} disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="text-xl">
              Não possui uma conta? &nbsp;
              <Link href="/cadastro">
                <LinkText className="text-[#6A38F3] text-xl">Cadastre-se</LinkText>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 