/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/msgsndr/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  swcMinify: true,
  poweredByHeader: false,
  distDir: "dist",
  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/',
      },
    ];
  },
};

module.exports = nextConfig; 