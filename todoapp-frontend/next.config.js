/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_AUTH_API: process.env.NEXT_PUBLIC_AUTH_API,
    NEXT_PUBLIC_TODO_API: process.env.NEXT_PUBLIC_TODO_API,
  },
}

module.exports = nextConfig
