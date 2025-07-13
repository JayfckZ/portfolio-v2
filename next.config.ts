import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ubpsncadgaenzsceqgpf.supabase.co'
      }
    ]
  }
};

export default nextConfig;
