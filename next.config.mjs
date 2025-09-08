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
            // and enable blob/data usage required by @react-pdf/renderer in production
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' blob:",
              "worker-src 'self' blob:",
              "connect-src 'self' https: blob: data:",
              "img-src 'self' https: data: blob:",
              "font-src 'self' https: data:",
              "style-src 'self' 'unsafe-inline' https:",
              "frame-ancestors 'self' https://app.parta.io"
            ].join('; '),
          },
          // Note: Do NOT set X-Frame-Options=SAMEORIGIN/DENY; CSP above is the modern control.
        ],
      },
    ]
  },
}

export default nextConfig
