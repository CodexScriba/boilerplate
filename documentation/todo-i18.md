# Internationalization (i18n) Implementation Todo List with next-intl

This document provides a comprehensive, step-by-step guide for implementing internationalization in a Next.js application using the next-intl library. It includes all required tasks, file structure, configurations, and additional information needed for successful implementation.

## Tasks Overview

1. Install the necessary dependencies
2. Set up translation files
3. Configure Next.js for i18n routing
4. Create the middleware for locale handling
5. Set up the i18n directory with routing and request configuration
6. Implement i18n in the app directory with locale-based routing
7. Configure internationalized routing as per requirements
8. Test the implementation

## File and Folder Structure

Create the following files and folders in this order:

```
├── messages
│   ├── en.json (Translation messages for English)
│   ├── es.json (Translation messages for Spanish)
│   └── [...other locales as needed]
├── next.config.mjs (Configuration for Next.js)
└── src
    ├── i18n
    │   ├── routing.ts (Routing configuration for i18n)
    │   └── request.ts (Request handler for i18n)
    ├── middleware.ts (Middleware for handling locale routing)
    └── app
        └── [locale]
            ├── layout.tsx (Layout with i18n provider)
            ├── page.tsx (Example page using translations)
            └── [...your app routes]
```

## Required Dependencies

1. Install next-intl:
   ```bash
   npm install next-intl
   ```

## Step-by-Step Implementation Guide

### 1. Create Translation Files

Create the following files to store your translations:

#### messages/en.json
```json
{
  "Navigation": {
    "home": "Home",
    "pricing": "Pricing",
    "about": "About"
  },
  "Pages": {
    "pricing": {
      "title": "Pricing",
      "description": "Our pricing plans"
    }
  }
}
```

#### messages/es.json
```json
{
  "Navigation": {
    "home": "Inicio",
    "pricing": "Precios",
    "about": "Acerca de"
  },
  "Pages": {
    "pricing": {
      "title": "Precios",
      "description": "Nuestros planes de precios"
    }
  }
}
```

### 2. Configure Next.js

Update or create `next.config.mjs`:

```javascript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
```

### 3. Set Up i18n Routing Configuration

Create `src/i18n/routing.ts`:

```typescript
import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // Supported locales
  locales: ['en', 'es'],
  
  // Default locale (English without a prefix)
  defaultLocale: 'en',
  
  // Configure localePrefix to implement our routing requirements
  localePrefix: 'as-needed',
  
  // Define path naming conventions for different locales
  pathnames: {
    // For the 'pricing' page:
    '/pricing': {
      en: '/pricing',      // English: domain.com/pricing
      es: '/precios'       // Spanish: domain.com/es/precios
    },
    // Add other pages similarly
  }
});

// Export navigation utilities for use in components
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
```

### 4. Configure Request Handler

Create `src/i18n/request.ts`:

```typescript
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // This corresponds to the [locale] segment
  let locale = await requestLocale;
  
  // Ensure a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

### 5. Set Up Middleware

Create `src/middleware.ts`:

```typescript
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match root, localized routes, and specific paths
  matcher: ['/', '/(es)/:path*', '/(pricing|about)']
};
```

### 6. Create Locale Layout

Create `src/app/[locale]/layout.tsx`:

```typescript
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Validate the locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  
  // Get messages for the current locale
  const messages = await getMessages();
  
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### 7. Create Example Page

Create `src/app/[locale]/pricing/page.tsx`:

```typescript
import {useTranslations} from 'next-intl';

export default function PricingPage() {
  const t = useTranslations('Pages.pricing');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### 8. Enable Static Rendering (Optional)

If you want to enable static rendering, add `generateStaticParams` to your layout:

```typescript
// Add to src/app/[locale]/layout.tsx
export function generateStaticParams() {
  return routing.locales.map(locale => ({locale}));
}
```

## Configuration for Specific Requirements

### URL Structure Configuration

The configuration in `routing.ts` with `localePrefix: 'as-needed'` and the custom `pathnames` satisfies the requirements:

- English URLs will appear as `domain.com/pricing` (without `/en/`)
- Spanish URLs will appear as `domain.com/es/precios`

### Built-in Language Detection

Next-intl provides multiple mechanisms for language detection:

1. **Automatic language detection**: The middleware can detect the user's preferred language using the `Accept-Language` header.

2. **Configuration for language detection**: 

   ```typescript
   // In src/i18n/routing.ts
   export const routing = defineRouting({
     // ...other config
     localeDetection: true  // Enable language detection
   });
   ```

3. **Custom language detection logic**:

   ```typescript
   // In middleware.ts
   export default createMiddleware({
     // ...other config
     localeDetection: {
       // Custom detection logic
       match: (request) => {
         // Logic to determine preferred locale
         // Can use cookies, headers, etc.
         return preferredLocale;
       }
     }
   });
   ```

## Using the Library - Quick Reference

### Translating Text in Components

```typescript
import {useTranslations} from 'next-intl';

function MyComponent() {
  const t = useTranslations('Namespace');
  return <h1>{t('key')}</h1>;
}
```

### Navigation Between Localized Routes

```typescript
import {Link} from '@/i18n/routing';

function Navigation() {
  return (
    <nav>
      <Link href="/pricing">Pricing</Link>
      {/* Automatically handles the correct path for the current locale */}
    </nav>
  );
}
```

### Formatting Dates and Numbers

```typescript
import {useFormatter} from 'next-intl';

function DateComponent({date}) {
  const format = useFormatter();
  return (
    <time>
      {format.dateTime(date, {
        dateStyle: 'full',
        timeStyle: 'short'
      })}
    </time>
  );
}
```

## Additional Considerations

1. **SEO**: next-intl automatically adds the correct `lang` attribute to your HTML element and can generate alternate links for different locales.

2. **Language Switcher**: Implement a language switcher component to allow users to manually select their preferred language.

3. **TypeScript Support**: Use the library's built-in TypeScript support for type-safe translations.

4. **Message Formats**: The library supports rich message formatting including pluralization, gender, and selection-based formatting.

5. **Integration with translation management systems**: Consider using systems like Crowdin for managing translations with your team.

## Conclusion

Next-intl provides a comprehensive solution for adding internationalization to Next.js applications. With the proper configuration, it handles routing, language detection, translations, and formatting in a way that integrates seamlessly with the App Router.

The library offers an excellent balance between ease of use and flexibility, allowing for precise control over URL structures and internationalized content.
