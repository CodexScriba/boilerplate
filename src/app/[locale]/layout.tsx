import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { PostHogProvider } from "../providers";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

/**
 * Poppins font configuration
 * 
 * This loads all weight variants from thin (100) to black (900)
 * for maximum flexibility in your design system
 * 
 */
const poppins = Poppins({
  // Include all weight variants from thin (100) to black (900)
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  // Define as a CSS variable for easy access throughout the application
  variable: '--font-poppins',
  // Include Latin character subset
  subsets: ['latin'],
  // Optional: You can also include font display strategy
  display: 'swap',
});

// Generate static params for all supported locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// TODO: Add dynamic metadata based on locale
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function RootLayout({children, params}: Props) {
  // Extract locale from params (which is a Promise in App Router)
  const {locale} = await params;
  
  // Validate that the incoming locale is supported
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <PostHogProvider>
            {children}
          </PostHogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
