import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // allow any path & query params
      },
      // If you ever use the other Unsplash endpoint, include this too:
      // { protocol: 'https', hostname: 'source.unsplash.com', pathname: '/**' },
    ],
    // or simpler:
    // domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
