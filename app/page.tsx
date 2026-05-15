'use client';

import Navbar from "@/app/components/layout/Navbar";
import SearchBar from "./components/ui/SearchBar";

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#ffffff" }}>
      <Navbar
        logoSrc="/logo-branca-stock.io.svg"
      />

      {/* visualização teste da barra de pesquisa */}
      <div className="w-full flex justify-center pt-12 px-4">
        <SearchBar />
      </div>

    </div>
  );
}