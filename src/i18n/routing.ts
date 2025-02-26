import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // Supported locales
  locales: ['en', 'es'],
  
  // Default locale (English without a prefix)
  defaultLocale: 'en',
  
  // Configure localePrefix to implement our routing requirements
  localePrefix: 'as-needed',
  
  // Enable language detection
  localeDetection: true,
  
  // Define path naming conventions for different locales
  pathnames: {
    // For the 'pricing' page:
    '/pricing': {
      en: '/pricing',      // English: domain.com/pricing
      es: '/precios'       // Spanish: domain.com/es/precios
    },
    '/about': {
      en: '/about',        // English: domain.com/about
      es: '/acerca-de'     // Spanish: domain.com/es/acerca-de
    },
    '/': {
      en: '/',             // English: domain.com/
      es: '/'              // Spanish: domain.com/es/
    }
  }
});

// Export navigation utilities for use in components
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
