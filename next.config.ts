import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  
  // TODO: In production, review and limit external image domains as needed
  images: {
    domains: ['via.placeholder.com'],
  },
};

export default withNextIntl(nextConfig);
