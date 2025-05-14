import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Completely disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Completely disable TypeScript checking during builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
