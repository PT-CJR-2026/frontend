import type { NextConfig } from "next";

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
      {
        protocol: "https",
        hostname: "qnxmixiyoohjezcqyvki.storage.supabase.co", // ← adicionar isso
      },
    ],
  },
};

module.exports = nextConfig;