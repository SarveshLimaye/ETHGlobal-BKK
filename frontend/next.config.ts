import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["cryptologos.cc"],
    dangerouslyAllowSVG: true, // Add your image host domain here
  },
};

export default nextConfig;
