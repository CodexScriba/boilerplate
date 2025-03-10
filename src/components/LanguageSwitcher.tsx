'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Language Switcher Component
 * 
 * This component allows users to switch between available languages in the application.
 * It uses next-intl hooks for localization and routing to maintain the current path
 * when switching languages.
 * 
 * TODO: 
 * - Add language icons or flags for better visual identification
 * - Consider adding language preference to user settings if auth is implemented
 * - Add animations for smoother transitions between languages
 */

interface LanguageSwitcherProps {
  className?: string;
}

// Define available languages
// TODO: Make sure this matches the locales defined in routing.ts
const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  // Get current locale, router and pathname from next-intl
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  // Handle language change by replacing the current URL with the same path but new locale
  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Select defaultValue={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger 
        className={`w-[120px] md:w-[150px] lg:w-[180px] !rounded-xl border !ring-offset-0 ${className}`}
        aria-label="Select language"
      >
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="!rounded-xl">
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
