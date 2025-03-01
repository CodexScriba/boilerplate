### Project Summary 
What is your project about?
-> enter project summary

## TechStach
Next.js 15
Supabase Auth
Next-intl
Next-theme for dark mode 
Playwright for testing, vercel suggest  E2E test
Posthog-js installation 
npx shadcn@latest add --all
###

### Ui components
- **Title.tsx**: A customizable title component with semantic heading levels and theme support.  
  **Variants**: `h1` | `h2` | `h3` | `h4` | `h5` | `h6` | `p`  
  **Colors**: `primary` | `secondary` | `accent` | `muted` | `muted-foreground` | `destructive` | `foreground`  
  **Weights**: `normal` | `medium` | `semibold` | `bold` | `extrabold`  
  **Sizes**: `xs` | `sm` | `base` | `lg` | `xl` | `2xl` | `3xl` | `4xl` | `5xl` | `6xl`  
  **Usage**: `<Title variant="h2" color="primary" weight="bold" size="xl">Title Text</Title>`

  ### Folder tree
  -Auth
  --callback-route.ts-> handles OAuth callbacks by exchanging a temporary code for a session.
  --confirm-route.ts-> verifies email OTP tokens for sign-up or password reset, while the
  --forgot-password.ts-> handles password reset by sending a reset link to the user's email.
  --components->
  ---LoginForm.tsx-> login form component
  ---RegistrationForm.tsx -> registration form component
  ---SocialButtons.Tsx -> social login buttons

Files that handle auth: 
src/utils/supabase/server.ts: Handles server-side Supabase client creation and authentication state management.
src/utils/supabase/server-internal.ts: Internal server client for Supabase, used in various utility functions.
src/utils/supabase/middleware.ts: Middleware for Supabase authentication, including session management.
src/utils/supabase/client.ts: Browser client for Supabase.
src/middleware.ts: Main middleware file that integrates Supabase authentication with Next.js middleware.
src/utils/paddle/process-webhook.ts: Processes webhooks and interacts with Supabase for authentication.
src/utils/paddle/get-customer-id.ts: Retrieves customer ID using Supabase authentication.
src/app/[locale]/(protected)/dashboard/page.tsx: Protected dashboard page that uses Supabase for authentication.