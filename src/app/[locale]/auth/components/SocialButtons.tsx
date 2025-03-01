"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Apple } from "lucide-react";
import { cn } from "@/lib/utils";
import { socialLogin } from "../registration/actions"; // Import the server action
import { SocialLoginResult } from "../registration/types";

export type SocialProvider = "google" | "facebook" | "apple";

interface SocialButtonsProps {
  className?: string;
  showProviders?: SocialProvider[];
}

const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="googleIconTitle"
    role="img"
  >
    <title id="googleIconTitle">Google Icon</title>
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const PROVIDER_CONFIG = {
  facebook: {
    icon: <Facebook size={20} aria-hidden="true" />,
    className: "bg-[#1877F2] text-white hover:bg-[#1877F2]/90",
    label: "Facebook",
  },
  google: {
    icon: <GoogleIcon />,
    className: "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50",
    label: "Google",
  },
  apple: {
    icon: <Apple size={20} aria-hidden="true" />,
    className: "bg-black text-white hover:bg-black/90",
    label: "Apple",
  },
} as const;

export function SocialButtons({
  className,
  showProviders = ["facebook", "google", "apple"],
}: SocialButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<SocialProvider | null>(null);

  async function handleSocialLogin(provider: SocialProvider) {
    try {
      setIsLoading(true);
      setActiveProvider(provider);
      setError(null);

      // Call the server action directly
      const result = await socialLogin(provider);

      // Type narrowing using 'in' operator
      if ('error' in result) {
        // Now TypeScript knows we're in the error variant
        setError(result.message || `Failed to login with ${provider}. Please try again.`);
        return;
      }

      // If we get here, TypeScript knows 'url' exists on the result
      window.location.href = result.url;
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setActiveProvider(null);
    }
  }

  return (
    <div className="space-y-3">
      {error && (
        <div 
          className="text-sm text-red-500 p-3 bg-red-50 border border-red-200 rounded-lg"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
      <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-3", className)} role="group" aria-label="Social login options">
        {showProviders.map((provider) => {
          const config = PROVIDER_CONFIG[provider];
          const isCurrentlyLoading = isLoading && activeProvider === provider;
          
          return (
            <Button
              key={provider}
              className={cn(
                "flex items-center justify-center gap-1 rounded-full text-xs h-10",
                "w-full truncate",
                config.className
              )}
              onClick={() => handleSocialLogin(provider)}
              disabled={isLoading}
              aria-disabled={isLoading}
              type="button"
            >
              <span className="flex-shrink-0">{config.icon}</span>
              <span className="truncate max-w-[100px]">{isCurrentlyLoading ? `Connecting...` : provider === "apple" ? "Apple" : config.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}