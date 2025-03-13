"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

/**
 * Custom hook for authentication state
 * 
 * Provides the current authentication state and user data if available
 * - Listens to auth state changes using Supabase's onAuthStateChange
 * - Returns loading state while initial check is performed
 * - Returns user object when authenticated
 * 
 * TODO: Add more robust error handling
 * TODO: Add refresh token functionality
 * TODO: Consider adding user profile data fetching
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Create Supabase client
    const supabase = createClient();
    
    // Set initial user state
    const getInitialUser = async () => {
      try {
        setLoading(true);
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          throw error;
        }
        
        setUser(user);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        console.error('Auth error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Call initial user check
    getInitialUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading, error, isAuthenticated: !!user };
}

export default useAuth;
