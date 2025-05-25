/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: false,
    assetPrefix: '/',
    images: {
      unoptimized: true,
    },
  }
  
module.exports = nextConfig
  