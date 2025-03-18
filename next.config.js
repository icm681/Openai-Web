/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone", // Agar lebih kompatibel di Vercel
  images: {
    domains: ["your-image-domain.com"], // Ganti jika menggunakan Next.js Image
  },
};

module.exports = nextConfig;