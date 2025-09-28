import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    NEXT_PUBLIC_API_ENDPOINT: process.env.API_ENDPOINT,
  },
  experimental: {
    authInterrupts: true,
  },
}

export default nextConfig
