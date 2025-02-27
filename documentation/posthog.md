Integrate PostHog with Next.js
Read the docs
Install posthog-js using your package manager
npm install posthog-js
# OR
yarn add posthog-js
# OR
pnpm add posthog-js
Add environment variables
Add your environment variables to your .env.local file and to your hosting provider (e.g. Vercel, Netlify, AWS). You can find your project API key in your project settings.

These values need to start with NEXT_PUBLIC_ to be accessible on the client-side.

NEXT_PUBLIC_POSTHOG_KEY=phc_uqvAK5ieqJvrioQE4UUbTar5FSzqXnJnqI1MndkZtmE
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
Initialize
App router
Pages router
If your Next.js app uses the app router, you can integrate PostHog by creating a providers file in your app folder. This is because the posthog-js library needs to be initialized on the client-side using the Next.js 'use client' directive.

// app/providers.tsx
'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { usePostHog } from 'posthog-js/react'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      capture_pageview: false // Disable automatic pageview capture, as we capture manually
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }

      posthog.capture('$pageview', { '$current_url': url })
    }
  }, [pathname, searchParams, posthog])

  return null
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}
Afterwards, import the PostHogProvider component in your app/layout.tsx file and wrap your app with it.

// app/layout.tsx

import './globals.css'
import { PostHogProvider } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
Send events
Click around and view a couple pages to generate some events. Our package automatically captures them for you.

Optional: Send a manual event
If you'd like, you can manually define events, too.

