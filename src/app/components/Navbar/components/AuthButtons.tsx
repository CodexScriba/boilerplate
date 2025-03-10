"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthButtonsProps } from "../types";
import { useTranslations } from 'next-intl';

/**
 * AuthButtons component
 * 
 * Renders login and sign up buttons with internationalized labels
 * Supports compact mode for mobile view
 * 
 * TODO: Add conditional rendering based on authentication state
 */
export function AuthButtons({ compact = false }: AuthButtonsProps) {
  // Get translations for auth buttons
  const t = useTranslations('Auth');
  
  if (compact) {
    return (
      <div className="flex space-x-2">
        <Button
          variant="default"
          className="rounded-full px-3 py-2 h-9 bg-secondary text-accent-foreground hover:bg-primary/90"
          asChild
        >
          <Link href="/auth/login">
            {t('login')}
          </Link>
        </Button>
        <Button
          variant="secondary"
          className="rounded-full px-3 py-2 h-9 bg-accent text-accent-foreground hover:bg-primary/90"
          asChild
        >
          <Link href="/auth/register">
            {t('signUp')}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        variant="default"
        className="rounded-full px-6 bg-secondary text-accent-foreground hover:bg-primary/90"
        asChild
      >
        <Link href="/auth/login">
          {t('login')}
        </Link>
      </Button>

      <Button
        variant="secondary"
        className="rounded-full px-6 bg-accent text-accent-foreground hover:bg-primary/90"
        asChild
      >
        <Link href="/auth/register">
          {t('signUp')}
        </Link>
      </Button>
    </>
  );
}