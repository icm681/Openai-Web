/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  api: {
    bodyParser: true, // Memastikan API bisa menerima request body
    externalResolver: true, // Menghindari Next.js menganggap API tidak digunakan
  },
};

module.exports = nextConfig;