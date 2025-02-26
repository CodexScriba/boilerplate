import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Create the next-intl middleware
const nextIntlMiddleware = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  // First, run the next-intl middleware
  const response = await nextIntlMiddleware(request)
  
  // Then, update the Supabase session using the response from next-intl
  return await updateSession(request, response)
}

export const config = {
  matcher: [
    // Match all internationalized pathnames
    '/',
    '/(en|es)/:path*',
    '/pricing',
    '/about',
    
    // Existing matcher for Supabase authentication
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
