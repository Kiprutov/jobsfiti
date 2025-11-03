/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Optional: Add trailing slash for better compatibility with static exports
  trailingSlash: true,
  // Enable React strict mode
  reactStrictMode: true,
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Disable server-side rendering for specific pages that use dynamic features
  // and should be client-side rendered
  experimental: {
    // Add any experimental features here if needed
  },
}

export default nextConfig
