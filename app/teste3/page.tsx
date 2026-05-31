"use client"

import React, { useState } from 'react';
import CarrosselLoja from '../components/ui/CarrosselLoja';
import { FiltroCategorias } from '../components/ui/FiltroCategorias';
import { Loja } from '../components/ui/CardLoja';

//mock de lojas vem pra cá temporariamente para o filtro funcionar sem o back por enquanto
const MOCK_LOJAS: Loja[] = [
  { id: 1, nome: "CJR", categoria: "mercado", logoUrl: "/logosLojas/LogoCJR.png" },
  { id: 2, nome: "Rare Beauty", categoria: "beleza", logoUrl: "/logosLojas/LogoRareB.png" },
  { id: 3, nome: "The Croc Brew", categoria: "mercado", logoUrl: "/logosLojas/LogoCrocB.png" },
  { id: 4, nome: "Mini Reno", categoria: "casa", logoUrl: "/logosLojas/LogoMiniReno.png" },
  { id: 5, nome: "amoca", categoria: "moda", logoUrl: "/logosLojas/LogoAmoca.png" },
  { id: 6, nome: "Repiit", categoria: "eletrônicos", logoUrl: "/logosLojas/LogoRepiit.png" },
  { id: 7, nome: "Creamy Skincare", categoria: "beleza", logoUrl: "/logosLojas/LogoCreamy.png" },
  { id: 8, nome: "Maumar", categoria: "mercado", logoUrl: "/logosLojas/LogoMaumar.png" },
  { id: 9, nome: "SneakerStore", categoria: "moda", logoUrl: "/logosLojas/LogoSneacker.png" },
  { id: 10, nome: "Melina Couture", categoria: "moda", logoUrl: "/logosLojas/LogoMelina.png" },
  { id: 11, nome: "d'carts & baskets", categoria: "mercado", logoUrl: "/logosLojas/LogoBasckets.png" },
  { id: 12, nome: "Fluffy House", categoria: "casa", logoUrl: "/logosLojas/LogoFluffy.png" },
  { id: 13, nome: "electree", categoria: "eletrônicos", logoUrl: "/logosLojas/LogoElectree.png" },
  { id: 14, nome: "Roots", categoria: "beleza", logoUrl: "/logosLojas/LogoRoots.png" },
];

export default function TestePage() {
  //cria a "memória" da página para guardar o que foi clicado no filtro
  //será removido posteriormente quando tiver integrado corretamente
  const [categoriasMarcadas, setCategoriasMarcadas] = useState<string[]>([]);

  //função que liga e desliga o check de uma categoria
  const toggleCategoria = (categoriaId: string) => {
    if (categoriasMarcadas.includes(categoriaId)) {
      //se já estava marcada, remove da lista
      setCategoriasMarcadas(categoriasMarcadas.filter(id => id !== categoriaId));
    } else {
      //se não estava marcada, adicion à lista
      setCategoriasMarcadas([...categoriasMarcadas, categoriaId]);
    }
  };

  //se não tem nada marcado, mostra todas. Se tem, filtra
  const lojasFiltradas = categoriasMarcadas.length === 0
    ? MOCK_LOJAS
    : MOCK_LOJAS.filter(loja => categoriasMarcadas.includes(loja.categoria));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-10 w-full">
      
      <CarrosselLoja 
        titulo="Lojas" 
        Lojas={lojasFiltradas} //passa a lista já filtrada para o carrossel
        acaoCabecalho={

          <FiltroCategorias 
            categoriasSelecionadas={categoriasMarcadas}
            onToggleCategoria={toggleCategoria}
          />
        }
      />

    </div>
  );
}