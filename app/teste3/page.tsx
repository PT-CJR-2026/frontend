import React from 'react';
import CarrosselLoja from '../components/ui/CarrosselLoja';

export default function TestePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-10 w-full">
      
      <CarrosselLoja 
        titulo="Lojas" 
        acaoCabecalho={
          <button className="text-sm font-medium text-[#6A38F3] hover:underline cursor-pointer">
            filtro
          </button>
        }
      />

    </div>
  );
}