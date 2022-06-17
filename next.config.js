/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    AWS_APPSYNC_API_KEY: process.env.AWS_APPSYNC_API_KEY,
  },
  images: {
    domains: ["images.unsplash.com", "avatars.dicebear.com"],
  },
};

module.exports = nextConfig;
