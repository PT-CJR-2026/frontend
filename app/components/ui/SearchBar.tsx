import React from 'react';

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-[603px] h-[38px]">
      <input
        type="text"
        placeholder="Procurar por..."
        className="w-full h-full bg-white rounded-full pl-6 pr-12 text-gray-800 placeholder-[#6A38F380] focus:outline-none focus:ring-2 focus:ring-[#6A38F3] shadow-sm font-sans"
      />
      
      {/*Ícone de Lupa*/}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A78BFA] pointer-events-none">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-5 h-5"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
          />
        </svg>
      </div>
    </div>
  );
}