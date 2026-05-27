'use client';

import Navbar from "@/app/components/layout/Navbar";
<<<<<<< HEAD
import SearchBar from "./components/ui/SearchBar";
=======
import Hero from "./components/layout/Hero";
>>>>>>> f5dfbc961cbe80623c8a73e00540dd17c7ee1730

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#ffffff" }}>
      <Navbar
        logoSrc="/logo-branca-stock.io.svg"
      />
<<<<<<< HEAD

      {/* visualização teste da barra de pesquisa */}
      <div className="w-full flex justify-center pt-12 px-4">
        <SearchBar />
      </div>

=======
      <Hero slug="home" />
>>>>>>> f5dfbc961cbe80623c8a73e00540dd17c7ee1730
    </div>
  );
}