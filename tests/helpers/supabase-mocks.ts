import { Page } from '@playwright/test';

/**
 * Helper function to mock Supabase authentication responses
 * @param page Playwright page object
 * @param options Configuration options for the mock
 */
export async function mockSupabaseAuth(page: Page, options: {
  verifyOtpSuccess?: boolean;
  errorMessage?: string;
} = {}) {
  const { verifyOtpSuccess = true, errorMessage = 'Invalid token' } = options;
  
  // Intercept all Supabase API calls
  await page.route('**/supabase/**', async route => {
    const url = route.request().url();
    
    // Handle OTP verification
    if (url.includes('verify')) {
      if (verifyOtpSuccess) {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ 
            data: { user: { id: 'test-user-id' } },
            error: null 
          })
        });
      } else {
        await route.fulfill({
          status: 400,
          body: JSON.stringify({ 
            data: null,
            error: { message: errorMessage } 
          })
        });
      }
    } else {
      // Continue with other requests
      await route.continue();
    }
  });
}
