import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

/**
 * Email Confirmation Handler
 * 
 * Verifies one-time password tokens sent to the user's email
 * during sign-up or password reset processes.
 */
export async function GET(request: Request) {
  // Extract verification parameters from URL
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const redirectTo = searchParams.get("redirect_to")?.toString() ?? "/dashboard";

  // Verify OTP if required parameters are present
  if (token_hash && type) {
    const supabase = await createClient();

    // Attempt to verify the OTP token
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    // Redirect to specified URL on successful verification
    if (!error) {
      return NextResponse.redirect(`${origin}${redirectTo}`);
    }
  }

  // Redirect to error page if verification fails
  return NextResponse.redirect(`${origin}/auth/verification-error`);
}