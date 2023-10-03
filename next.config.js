/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    swcTraceProfiling: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
