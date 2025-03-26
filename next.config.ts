// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "assets.example.com",
//         pathname: "/account123/**",
//       },
//     ],
//     domains: ["randomuser.me, lh3.googleusercontent.com"], // ✅ Add this line to allow images from this domain
//   },
// };

// export default nextConfig;

// =======
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.example.com",
        pathname: "/account123/**",
      },
    ],
    domains: ["randomuser.me"], // ✅ Correct location for domains
  },
};

export default nextConfig;
