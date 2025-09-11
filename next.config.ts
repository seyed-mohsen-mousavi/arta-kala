import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [new URL('https://artakalaa.ir/api/media/**') , new URL('https://artakalaa.com/Files/**')],
  },
};

export default nextConfig;