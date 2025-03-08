# Next.js 15 Project Documentation

## Project Summary
<!-- TODO: Add your project summary here -->

## Tech Stack
- **Next.js 15** - React framework
- **Supabase Auth** - Authentication service
- **next-intl** - Internationalization
- **next-theme** - Dark mode support
- **Playwright** - E2E testing (recommended by Vercel)
- **PostHog.js** - Analytics
- **shadcn/ui** - UI component library

## UI Components

### Title Component
A customizable title component with semantic heading levels and theme support.

**Props:**
- **variant**: `h1` | `h2` | `h3` | `h4` | `h5` | `h6` | `p`  
- **color**: `primary` | `secondary` | `accent` | `muted` | `muted-foreground` | `destructive` | `foreground`  
- **weight**: `normal` | `medium` | `semibold` | `bold` | `extrabold`  
- **size**: `xs` | `sm` | `base` | `lg` | `xl` | `2xl` | `3xl` | `4xl` | `5xl` | `6xl`  

**Usage Example:**
```tsx
<Title variant="h2" color="primary" weight="bold" size="xl">
  Title Text
</Title>
```

## Project Structure

### Authentication Module
The authentication system is built with Supabase Auth and organized as follows:

#### Auth Routes
- **`/auth/callback-route.ts`** - Handles OAuth callbacks by exchanging a temporary code for a session
- **`/auth/confirm-route.ts`** - Verifies email OTP tokens for sign-up or password reset
- **`/auth/forgot-password.ts`** - Handles password reset by sending a reset link to the user's email

#### Auth Components
- **`/auth/components/LoginForm.tsx`** - Login form component
- **`/auth/components/RegistrationForm.tsx`** - Registration form component
- **`/auth/components/SocialButtons.tsx`** - Social login buttons

#### Auth Pages
- **`/auth/error/page.tsx`** - Displays an error message when authentication fails
- **`/auth/login/page.tsx`** - Displays the login form
- **`/auth/login/actions.ts`** - Handles login actions
- **`/auth/login/types.ts`** - Defines login form values and validation schema
- **`/auth/registration/page.tsx`** - Displays the registration form
- **`/auth/registration/actions.ts`** - Handles registration actions
- **`/auth/registration/types.ts`** - Defines registration form values and validation schema

#### Auth Utilities
- **`/src/utils/supabase/server.ts`** - Handles server-side Supabase client creation and authentication state management
- **`/src/utils/supabase/server-internal.ts`** - Internal server client for Supabase
- **`/src/utils/supabase/middleware.ts`** - Middleware for Supabase authentication and session management
- **`/src/utils/supabase/client.ts`** - Browser client for Supabase
- **`/src/middleware.ts`** - Main middleware file that integrates Supabase authentication with Next.js middleware
- **`/src/utils/paddle/process-webhook.ts`** - Processes webhooks and interacts with Supabase for authentication
- **`/src/utils/paddle/get-customer-id.ts`** - Retrieves customer ID using Supabase authentication
- **`/src/app/[locale]/(protected)/dashboard/page.tsx`** - Protected dashboard page that uses Supabase for authentication

### Navigation Components

```
app/components/
├── Navbar/
│   ├── index.tsx                  # Main Navbar component with responsive rendering logic
│   ├── types.ts                   # TypeScript interfaces for all navbar components
│   ├── components/
│   │   ├── DesktopNav.tsx         # Desktop version (shown on lg screens)
│   │   ├── TabletNav.tsx          # Tablet version (shown on md screens)
│   │   ├── MobileNav.tsx          # Mobile version with hamburger menu (shown on sm screens)
│   │   ├── NavLink.tsx            # Reusable component for navigation links
│   │   ├── NavLogo.tsx            # Reusable component for the site logo
│   │   └── client/                # Client components (interactive elements)
│   │       ├── AuthButtons.tsx    # Login/Register buttons with responsive variants
│   │       ├── LangSwitcher.tsx   # Language selection dropdown
│   │       └── MobileMenu.tsx     # Mobile navigation menu overlay
└── config/
    └── navLinks.ts               # Configuration file for navigation items
```

## Navbar Component Implementation

### Component Interactions

#### Rendering Flow
1. The main `Navbar` component is rendered inside a layout component
2. Based on the viewport size, one of the three responsive variants is rendered:
   - `DesktopNav` for large screens (lg and above)
   - `TabletNav` for medium screens (md to lg)
   - `MobileNav` for small screens (below md)

#### Data Flow
- **Navigation Items:**
  - `navLinks` configuration is imported by each navbar variant
  - Links are mapped to `NavLink` components with appropriate props for each screen size

- **Shared Components:**
  - `NavLogo` is used across all variants with different size props
  - `NavLink` provides consistent navigation link rendering with flexibility for different displays

- **Client Interactions:**
  - `MobileMenu` manages its own open/closed state with useState
  - `LangSwitcher` handles language selection with a callback
  - All interactive components are isolated in the "client" folder to optimize server components

### Accessibility Considerations
- Proper ARIA attributes are included for screen readers
- Keyboard navigation is supported in the mobile menu (Escape to close)
- Semantic HTML is used with appropriate roles

### Responsive Behavior
The responsive design is implemented using Tailwind's responsive utility classes:
- `hidden lg:block` — Only visible on large screens
- `hidden md:block lg:hidden` — Only visible on medium screens
- `block md:hidden` — Only visible on small screens

### Usage Example
```tsx
// app/layout.tsx
import { Navbar } from '@/components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

### Type Safety
All components are fully typed with TypeScript interfaces defined in `types.ts`, ensuring type safety across the entire implementation. Props are explicitly defined with appropriate types and optional flags where needed.

## Paddle Integration

### Overview
The project integrates with Paddle, a payment processing platform for subscription management, billing, and checkout. The implementation allows for retrieving customer subscriptions, transactions, and pricing information.

### Folder Structure

```
src/
├── utils/
│   ├── paddle/
│   │   ├── get-paddle-instance.ts     # Creates and configures Paddle SDK instance
│   │   ├── get-customer-id.ts         # Retrieves customer ID from Supabase
│   │   ├── get-transactions.ts        # Fetches transaction history
│   │   ├── get-subscription.ts        # Gets details for a specific subscription
│   │   ├── get-subscriptions.ts       # Lists all subscriptions for a customer
│   │   └── data-helpers.ts            # Utility functions for response formatting
├── hooks/
│   └── usePaddlePrices.ts             # React hook for fetching and managing pricing
├── constants/
│   └── pricing-tier.ts                # Defines product tiers and their Paddle price IDs
└── lib/
    └── api.types.ts                   # TypeScript interfaces for Paddle API responses
```

### How Files Are Related

#### Server-Side Components
1. **`get-paddle-instance.ts`**: 
   - Core utility that initializes the Paddle SDK with API keys and environment settings
   - Used by all other server-side Paddle utilities

2. **`get-customer-id.ts`**: 
   - Connects to Supabase to retrieve the current user's Paddle customer ID
   - Called by subscription and transaction utilities to identify the customer

3. **`get-subscriptions.ts`** and **`get-subscription.ts`**:
   - Server actions that fetch subscription data for the authenticated user
   - Use the customer ID to query Paddle's API for subscription information
   - Return typed responses using interfaces from `api.types.ts`

4. **`get-transactions.ts`**:
   - Server action that retrieves transaction history for the authenticated user
   - Uses the same pattern of getting customer ID and querying Paddle

5. **`data-helpers.ts`**:
   - Contains utility functions for formatting API responses and handling errors
   - Provides consistent error handling across all Paddle-related server actions

#### Client-Side Components
1. **`usePaddlePrices.ts`**:
   - React hook that fetches pricing information using the Paddle JS SDK
   - Takes a Paddle instance and country code as inputs
   - Returns formatted pricing data and loading state
   - Used in pricing-related components to display tier prices

2. **`pricing-tier.ts`**:
   - Defines the product tiers (Starter, Pro, Advanced)
   - Maps each tier to its corresponding Paddle price IDs for monthly and yearly billing
   - Used by the pricing hook to fetch the correct prices

### How To Use

#### Environment Setup
1. Configure the required environment variables:
   ```
   PADDLE_API_KEY=your_paddle_api_key
   NEXT_PUBLIC_PADDLE_ENV=sandbox or production
   ```

#### Server-Side Usage (Fetching Subscriptions)
```typescript
// In a server component or server action:
import { getSubscriptions } from '@/utils/paddle/get-subscriptions';

// Get all subscriptions for the current user
const subscriptionResponse = await getSubscriptions();

if (subscriptionResponse.error) {
  // Handle error
} else {
  // Use subscription data
  const subscriptions = subscriptionResponse.data;
}
```

#### Server-Side Usage (Fetching a Single Subscription)
```typescript
// In a server component or server action:
import { getSubscription } from '@/utils/paddle/get-subscription';

// Get details for a specific subscription
const subscriptionId = 'sub_123456';
const subscriptionResponse = await getSubscription(subscriptionId);

if (subscriptionResponse.error) {
  // Handle error
} else {
  // Use subscription data
  const subscription = subscriptionResponse.data;
}
```

#### Server-Side Usage (Fetching Transactions)
```typescript
// In a server component or server action:
import { getTransactions } from '@/utils/paddle/get-transactions';

// Get transaction history for the current user
const transactionResponse = await getTransactions();

if (transactionResponse.error) {
  // Handle error
} else {
  // Use transaction data
  const transactions = transactionResponse.data;
}
```

#### Client-Side Usage (Displaying Prices)
```tsx
// In a client component:
import { usePaddlePrices } from '@/hooks/usePaddlePrices';
import { PricingTier } from '@/constants/pricing-tier';
import { Paddle } from '@paddle/paddle-js';

// Initialize Paddle JS SDK
const paddle = new Paddle({
  environment: process.env.NEXT_PUBLIC_PADDLE_ENV === 'production' 
    ? 'production' 
    : 'sandbox',
  token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
});

function PricingComponent() {
  const country = 'US'; // Or dynamically determine from user location
  const { prices, loading } = usePaddlePrices(paddle, country);
  
  if (loading) {
    return <div>Loading prices...</div>;
  }
  
  return (
    <div>
      {PricingTier.map((tier) => (
        <div key={tier.id}>
          <h3>{tier.name}</h3>
          <p>{tier.description}</p>
          <div>
            <p>Monthly: {prices[tier.priceId.month] || 'N/A'}</p>
            <p>Yearly: {prices[tier.priceId.year] || 'N/A'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Important Notes

- **Customer ID Retrieval**: The system expects a `customers` table in Supabase with `email` and `customer_id` columns to map users to their Paddle customer IDs.

- **Error Handling**: All Paddle utilities include error handling and return standardized response objects with optional error messages.

- **Environment Switching**: The implementation supports both sandbox and production environments through the `NEXT_PUBLIC_PADDLE_ENV` environment variable.

- **API Key Security**: The Paddle API key is only used server-side to prevent exposure in client-side code.

### TODO: Future Improvements
- Add webhook handling for subscription status changes
- Implement subscription cancellation and update flows
- Add caching for pricing data to reduce API calls
- Create reusable components for displaying subscription information