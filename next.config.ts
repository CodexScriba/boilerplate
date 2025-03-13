import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * Next.js Configuration
 * 
 * Contains configuration for:
 * - Internationalization via next-intl
 * - Image domains for external images
 * - Webpack configuration to handle Supabase node-fetch issues
 * 
 * TODO: In production, review and limit external image domains as needed
 * TODO: Consider adding Content Security Policy headers
 */
const nextConfig: NextConfig = {
  /* config options here */
  
  // TODO: In production, review and limit external image domains as needed
  images: {
    domains: ['via.placeholder.com'],
  },
  
  // Fix for Supabase node-fetch build error
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        'node-fetch': false,
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
