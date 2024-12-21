import type { NextConfig } from "next";

const nextConfig: NextConfig = {
};

module.exports = {
  reactStrictMode: true,
  transpilePackages: [],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval';"
          }
        ],
      },
    ]
  }
}

export default nextConfig;
