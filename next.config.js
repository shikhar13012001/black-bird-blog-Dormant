/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    AWS_APPSYNC_API_KEY: process.env.AWS_APPSYNC_API_KEY,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "avatars.dicebear.com",
      "i.ibb.co",
      "www.tailwind-kit.com",
    ],
  },
};

module.exports = nextConfig;
