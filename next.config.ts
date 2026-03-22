import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/compress-image-to-:size",
        destination: "/compress-image/:size",
      },
      {
        source: "/compress-pdf-to-:size",
        destination: "/compress-pdf/:size",
      },
    ];
  },
};

export default nextConfig;
