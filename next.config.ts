import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/pixel.js',
        destination: '/api/pixel.js',
      },
    ];
  },
};

export default nextConfig;
