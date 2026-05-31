import React from 'react';
import { CardCategoria } from '../components/ui/CardCategoria';
import CarrosselCategoria from '../components/ui/CarrosselCategoria';

export default function TestePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-10 w-full">
      
      <CarrosselCategoria titulo="Categorias" />

    </div>
    
    
  );
}