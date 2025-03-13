"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, LogOut, User } from "lucide-react";
import useAuth from "@/hooks/useAuth";

/**
 * AuthButtons Component
 * 
 * Provides login and register buttons for the navbar
 * - Uses Next.js Link component for client-side navigation
 * - Includes appropriate icons for better UX
 * - Conditionally hides buttons when already on auth pages
 * - Shows user profile button and logout when user is authenticated
 * 
 * TODO: Add animation for hover states
 * TODO: Consider adding dropdown menu for more auth options
 * TODO: Add user profile dropdown with additional options
 */
const AuthButtons = () => {
  const pathname = usePathname();
  const { user, loading, isAuthenticated } = useAuth();
  
  // Don't show auth buttons when already on auth pages
  if (pathname?.includes('/auth/')) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-16 bg-muted animate-pulse rounded-md"></div>
      </div>
    );
  }

  // Show user profile and logout when authenticated
  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        {/* User Profile Button */}
        <Link href="/dashboard">
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-1 text-sm font-medium"
          >
            <User className="h-4 w-4" />
            {user?.email?.split('@')[0] || 'Profile'}
          </Button>
        </Link>

        {/* Logout Button */}
        <form action="/auth/signout" method="post">
          <Button 
            variant="outline" 
            size="sm"
            type="submit"
            className="flex items-center gap-1 text-sm font-medium"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </form>
      </div>
    );
  }

  // Show login and register buttons when not authenticated
  return (
    <div className="flex items-center gap-2">
      {/* Login Button */}
      <Link href="/auth/login">
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-1 text-sm font-medium"
        >
          <LogIn className="h-4 w-4" />
          Login
        </Button>
      </Link>

      {/* Register Button */}
      <Link href="/auth/register">
        <Button 
          variant="default" 
          size="sm"
          className="flex items-center gap-1 text-sm font-medium"
        >
          <UserPlus className="h-4 w-4" />
          Register
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
