'use client'

import React, { useState } from 'react';
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import LinkText from "@/app/components/ui/LinkText";
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { League_Spartan } from 'next/font/google';
import { CadastroService } from '../services/CadastroService';

const leagueSpartan = League_Spartan({ subsets: ['latin'] });

interface CadastroFormValues {
  nomeCompleto: string;
  username: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

const initialValues: CadastroFormValues = {
  nomeCompleto: '',
  username: '',
  email: '',
  senha: '',
  confirmarSenha: '',
};

// Esquema de Validação (Yup)
const validationSchema = Yup.object().shape({
  nomeCompleto: Yup.string().required('O nome completo é obrigatório'),
  username: Yup.string().required('O username é obrigatório'),
  email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
  senha: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha')], 'As senhas não coincidem')
    .required('A confirmação é obrigatória'),
});

const cadastroService = new CadastroService(); // Instanciando o serviço

export default function Cadastro() {
  const router = useRouter();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  // função de submit
  const onSubmit = async (values: CadastroFormValues, { setSubmitting }: any) => {
    try {
      await cadastroService.cadastrar({
        nome: values.nomeCompleto,
        username: values.username,
        email: values.email,
        senha_hash: values.senha,
      });

      toast.success('Cadastro realizado com sucesso!');
      
      // 1.5 segundos até ser redirecionado pra página de login (suficiente pra ler a confirmação visual)
      setTimeout(() => {
        router.push('/login');
      }, 1500);

    } catch (error: any) {
      // Tratamento de erros do back
      const status = error?.response?.status;
      if (status === 409) {
        toast.error('Este email ou username já está cadastrado.');
      } else {
        toast.error('Erro ao realizar o cadastro. Tente novamente mais tarde.');
      }
    } finally {
      // Libera o botão independente de dar certo ou errado
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Stock.IO - Criar Conta</title>
      </Head>

      <main className="h-screen flex flex-col md:flex-row bg-[#F6F3E4] font-sans overflow-hidden">
        
        {/* COLUNA ESQUERDA */}
        <div className="w-full lg:w-[50%] min-h-screen flex flex-col pt-[50px] pl-[85px] z-10">
          
          {/* CARD ESCURO */}
          <div className="bg-[#171918] w-full max-w-[654px] flex-1 p-12 sm:p-16 shadow-2xl flex flex-col rounded-t-[48px] rounded-b-none overflow-hidden">
            
            <h1 className="text-[#F6F3E4] text-[44px] font-extrabold text-center mb-[60px] uppercase">
              CRIE SUA CONTA
            </h1>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col w-[504px] mx-auto gap-[15px]">
                  
                  {/* Nome Completo */}
                  <div>
                    <Field
                      type="text"
                      name="nomeCompleto"
                      placeholder="Nome Completo"
                      className="w-full h-[48px] bg-[#F6F3E4] text-[#858585] placeholder-[#858585] rounded-[72px] px-6 focus:outline-none focus:ring-2 focus:ring-[#6A38F3] autofill:bg-[#F6F3E4] [&_input]:bg-[#F6F3E4]"
                    />
                    <ErrorMessage name="nomeCompleto" component="div" className="text-red-400 text-xs mt-1 ml-4" />
                  </div>

                  {/* Username */}
                  <div>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="w-full h-[48px] bg-[#F6F3E4] text-[#858585] placeholder-[#858585] rounded-[72px] px-6 focus:outline-none focus:ring-2 focus:ring-[#6A38F3] autofill:bg-[#F6F3E4] [&_input]:bg-[#F6F3E4]"
                    />
                    <ErrorMessage name="username" component="div" className="text-red-400 text-xs mt-1 ml-4" />
                  </div>

                  {/* Email */}
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full h-[48px] bg-[#F6F3E4] text-[#858585] placeholder-[#858585] rounded-[72px] px-6 focus:outline-none focus:ring-2 focus:ring-[#6A38F3] autofill:bg-[#F6F3E4] [&_input]:bg-[#F6F3E4]"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-400 text-xs mt-1 ml-4" />
                  </div>

                  {/* Senha */}
                  <div className="relative">
                    <Field
                      type={mostrarSenha ? "text" : "password"}
                      name="senha"
                      placeholder="Senha"
                      className="w-full h-[48px] bg-[#F6F3E4] text-[#858585] placeholder-[#858585] rounded-[72px] px-6 focus:outline-none focus:ring-2 focus:ring-[#6A38F3] autofill:bg-[#F6F3E4] [&_input]:bg-[#F6F3E4]"
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <ErrorMessage name="senha" component="div" className="text-red-400 text-xs mt-1 ml-4" />
                  </div>

                  {/* Confirmar Senha */}
                  <div className="relative">
                    <Field
                      type={mostrarConfirmarSenha ? "text" : "password"}
                      name="confirmarSenha"
                      placeholder="Confirmar Senha"
                      className="w-full h-[48px] bg-[#F6F3E4] text-[#858585] placeholder-[#858585] rounded-[72px] px-6 focus:outline-none focus:ring-2 focus:ring-[#6A38F3] autofill:bg-[#F6F3E4] [&_input]:bg-[#F6F3E4]"
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <ErrorMessage name="confirmarSenha" component="div" className="text-red-400 text-xs mt-1 ml-4" />
                  </div>

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    className="mt-[27px] h-[52px]"
                  >
                    CRIAR CONTA
                  </Button>

                  {/* Link para Login */}
                  <div className="text-[20px] mt-[30px] text-white font-light">
                    Já possui uma conta?{' '}
                    <Link href="/login" className="text-[#6A38F3] font-bold hover:underline">
                      Login
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* COLUNA DIREITA: Logo e Mascote */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-start relative pt-0">

          {/* Logo */}
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

          {/* Mascote */}
          <div className="w-[497px] max-w-full relative h-[70vh]">
            <Image 
              src="/StockLee - Mascote 2 da Stock.io.png" 
              alt="Mascote Stock.IO" 
              width={497} 
              height={1129} 
              className="object-contain"
              priority
            />
          </div>

        </div>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}