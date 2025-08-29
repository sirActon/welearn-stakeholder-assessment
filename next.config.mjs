/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Allow this app to be embedded in an iframe on app.parta.io
            value: "frame-ancestors 'self' https://app.parta.io;",
          },
          // Note: Do NOT set X-Frame-Options=SAMEORIGIN/DENY; CSP above is the modern control.
        ],
      },
    ]
  },
}

export default nextConfig
