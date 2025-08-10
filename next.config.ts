import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [new URL('https://mpttools.co/media/**')],
  },
};

export default nextConfig;