

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  trailingSlash: true,
  experimental: {
    appDir: true, // Jika pakai Next.js 14 ke atas
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // Hindari masalah dengan fs di serverless
    return config;
  },
};

module.exports = nextConfig;