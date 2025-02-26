import { createServerClient, type CookieMethodsServer } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest, initialResponse?: NextResponse) {
  const response = initialResponse || NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const cookieMethods: CookieMethodsServer = {
    getAll: () => {
      return Array.from(request.cookies.getAll()).map(cookie => ({
        name: cookie.name,
        value: cookie.value,
      }))
    },
    setAll: (cookies) => {
      cookies.forEach(cookie => {
        request.cookies.set({
          name: cookie.name,
          value: cookie.value,
          ...cookie.options,
        })
        
        response.cookies.set({
          name: cookie.name,
          value: cookie.value,
          ...cookie.options,
        })
      })
    }
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookieMethods,
    }
  )

  await supabase.auth.getUser()

  return response
}
