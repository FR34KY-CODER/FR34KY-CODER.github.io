import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.GITHUB_ACTIONS ? "export" : undefined,
  env: { NEXT_PUBLIC_STATIC_CONTACT: process.env.GITHUB_ACTIONS ? "true" : "false" },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

