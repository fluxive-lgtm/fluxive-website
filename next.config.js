/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // For EasyHost: build static export
  // For Vercel: comment out 'output' line to enable API routes
  output: process.env.VERCEL ? undefined : 'export',
  images: {
    unoptimized: true,
  },
  // Explicitly set project root to avoid lockfile confusion
  turbopack: {
    root: __dirname,
    resolveAlias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // Webpack fallback for non-turbopack builds
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

module.exports = nextConfig;
