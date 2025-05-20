/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig; 