/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

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
    const scriptSrc = ["'self'", "'unsafe-inline'", "blob:"];
    // WebAssembly usage in production (react-pdf) and webpack eval in dev
    if (isProd) {
      scriptSrc.push("'wasm-unsafe-eval'");
    } else {
      scriptSrc.push("'unsafe-eval'", "'wasm-unsafe-eval'");
    }

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
              `script-src ${scriptSrc.join(' ')}`,
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
