'use client';

import Navbar from "@/app/components/layout/Navbar";
import Hero from "./components/layout/Hero";

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#ffffff" }}>
      <Navbar
        logoSrc="/logo-branca-stock.io.svg"
      />
      <Hero slug="home" />
    </div>
  );
}