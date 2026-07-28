import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
  transpilePackages: ["@apd-studio/rules", "@apd-studio/templates", "@apd-studio/ui"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
