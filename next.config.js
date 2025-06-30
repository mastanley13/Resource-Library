/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: false,
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