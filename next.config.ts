import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BUILD_TIME: new Date().toISOString(),
  },
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "small-lion-476.convex.cloud",
        pathname: "/api/storage/**",
      },
    ],
  },
};

export default nextConfig;