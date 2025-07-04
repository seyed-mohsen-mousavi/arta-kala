import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [new URL('https://mpttools.co/media/**')],
  },
};

export default nextConfig;
