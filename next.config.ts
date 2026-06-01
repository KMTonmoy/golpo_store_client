/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Allows all paths from this hostname
      },
      // Add other hostnames if needed, for example:
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.example.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
  // Your other configurations...
};

module.exports = nextConfig;