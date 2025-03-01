'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { RegisterFormValues, registerSchema } from './types';
import { z } from 'zod';

// Define response types for better type safety
export type AuthResult = 
  | { success: true }
  | { error: true; message: string };

export type SocialLoginResult = 
  | { url: string }
  | { error: true; message: string };

export async function register(data: RegisterFormValues): Promise<AuthResult> {
  // Server-side validation
  try {
    // Validate the data again on the server
    registerSchema.parse(data);
    
    const supabase = await createClient();
    
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          display_name: data.displayName,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      return { error: true, message: error.message };
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(e => `${e.path}: ${e.message}`).join(', ');
      return { error: true, message: errorMessage };
    }
    
    // Handle other errors
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { error: true, message };
  }
}

export async function socialLogin(provider: string): Promise<SocialLoginResult> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as any, // Type assertion needed for the provider string
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      return { error: true, message: error.message };
    }

    if (!data.url) {
      return { error: true, message: 'Failed to generate login URL' };
    }

    return { url: data.url };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { error: true, message };
  }
}