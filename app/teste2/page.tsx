import React from 'react';
import { CardCategoria } from '../components/ui/CardCategoria';
import CarrosselCategoria from '../components/ui/CarrosselCategoria';
import IndicePagina from '../components/ui/IndicePaginas';
import CardAvaliacao from '../components/ui/CardAvaliacao';

export default function TestePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-10 w-full">
      
      <CarrosselCategoria titulo="Categoria" />

      <br />
      <CardAvaliacao nomeUsuario="Usuário" comentario="Uau!!!" nota={5} avatarUrl="../mascote-hero.png" ></CardAvaliacao>

    </div>    
  );
}