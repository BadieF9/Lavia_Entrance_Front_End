import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "http://localhost:3000/:path*", // Replace with your API server
    },
  ],
};

export default nextConfig;
