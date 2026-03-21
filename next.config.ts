import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/compress-image-to-:size",
        destination: "/compress-image/:size",
      },
    ];
  },
};

export default nextConfig;
