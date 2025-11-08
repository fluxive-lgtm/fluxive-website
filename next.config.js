/** @type {import('next').NextConfig} */
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
  },
};

module.exports = nextConfig;
