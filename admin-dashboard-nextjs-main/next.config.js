/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh']
  },
  experimental: {
    serverComponentsExternalPackages: ['@tremor/react'],
    serverActions: true,
    optimizeCss: true,
  },
  
};

module.exports = nextConfig;
