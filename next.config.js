/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["your-image-domain.com"], // Sesuaikan kalau ada penggunaan Next.js Image
  },
};

module.exports = nextConfig;