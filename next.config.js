import { withPayload } from '@payloadcms/next/withPayload'
import { createRequire } from 'module'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

const requireFn = createRequire(import.meta.url)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    esmExternals: true,
  },
  reactStrictMode: true,
  redirects,
  async rewrites() {
    return [
      {
        source: '/api/payload/:path*',
        destination: '/api/payload/:path*',
      },
      {
        source: '/api/graphql',
        destination: '/api/graphql',
      }
    ]
  },
  webpack(config) {
    // Ensure all imports of @payloadcms/ui resolve to the hoisted package
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@payloadcms/ui': requireFn.resolve('@payloadcms/ui'),
      '@payloadcms/richtext-lexical/node_modules/@payloadcms/ui': requireFn.resolve('@payloadcms/ui'),
    }
    return config
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
