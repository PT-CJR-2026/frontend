import type { NextConfig } from "next";


// Quem fez o código abaixo foi o Claude, creditos a IA
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "seu-bucket.s3.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
