"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthButtonsProps {
  compact?: boolean;
}

export function AuthButtons({ compact = false }: AuthButtonsProps) {
  if (compact) {
    return (
      <div className="flex space-x-2">
        <Button
          variant="default"
          className="rounded-full px-3 py-2 h-9 bg-secondary text-accent-foreground hover:bg-primary/90"
          asChild
        >
          <Link href="/auth/login">
            Login
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
          Login
        </Link>
      </Button>

      <Button
        variant="secondary"
        className="rounded-full px-6 bg-accent text-accent-foreground hover:bg-primary/90"
        asChild
      >
        <Link href="/auth/register">
          Sign Up
        </Link>
      </Button>
    </>
  );
}
