/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Since we're migrating from a SPA, we might need some redirects or rewrites later
};

export default nextConfig;
