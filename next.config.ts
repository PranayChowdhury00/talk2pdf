import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        pathname: "/account123/**",
      },
    ],
    domains: ["randomuser.me"], // ✅ Add this line to allow images from this domain
  },
};

export default nextConfig;
