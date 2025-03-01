import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for server-side operations
 * 
 * This function creates a server-side Supabase client with proper cookie handling
 * for authentication state management.
 * 
 * @returns A Supabase client configured for server-side use
 * 
 * TODO: Add more robust error handling for cookie operations
 */
export const createClient = async () => {
  // Get the cookie store - in Next.js 15, cookies() is async
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie errors
            console.error('Error setting cookie:', error)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookie errors
            console.error('Error removing cookie:', error)
          }
        },
      },
    }
  )
}
