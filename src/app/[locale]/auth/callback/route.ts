import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

/**
 * Authentication Callback Handler
 * 
 * Processes the OAuth callback or magic link authentication flow.
 * Exchanges the temporary code for a session and redirects the user.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const redirectTo = searchParams.get('redirect_to')?.toString() ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${redirectTo}`);
    }
  }

  // Redirect to error page with instructions if authentication fails
  return NextResponse.redirect(`${origin}/auth/auth-error`);
}