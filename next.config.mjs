/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Image optimization
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'lakebayltd.com'  // Added for job listing logos
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // Allow all HTTPS images
      },
    ],
  },
  
  // Experimental features
  experimental: {
    // Enable server actions (if needed)
    serverActions: true,
  },
  
  // Enable webpack 5
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't include certain packages in the client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
      };
    }
    return config;
  },
}

export default nextConfig
