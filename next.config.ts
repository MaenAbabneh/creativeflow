import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.gettyimages.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
