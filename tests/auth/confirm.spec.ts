import { test, expect } from '@playwright/test';
import { mockSupabaseAuth } from '../helpers/supabase-mocks';

test.describe('Auth Confirmation Route', () => {
  test('redirects to next parameter when verification is successful', async ({ page }) => {
    // Mock a successful OTP verification
    await mockSupabaseAuth(page, { verifyOtpSuccess: true });
    
    // Navigate to the confirmation URL with parameters
    await page.goto('/en/auth/confirm?token_hash=valid_token&type=signup&next=/dashboard');
    
    // Assert that the page redirects to the dashboard
    await page.waitForURL('/dashboard');
    expect(page.url()).toContain('/dashboard');
  });

  test('redirects to error page when verification fails', async ({ page }) => {
    // Mock a failed OTP verification
    await mockSupabaseAuth(page, { verifyOtpSuccess: false, errorMessage: 'Invalid token' });
    
    // Navigate to the confirmation URL with parameters
    await page.goto('/en/auth/confirm?token_hash=invalid_token&type=signup');
    
    // Assert that the page redirects to the error page
    await page.waitForURL('/auth/error');
    expect(page.url()).toContain('/auth/error');
  });

  test('redirects to error page when parameters are missing', async ({ page }) => {
    // No need to mock Supabase for this test as it won't reach that point
    
    // Navigate to the confirmation URL without parameters
    await page.goto('/en/auth/confirm');
    
    // Assert that the page redirects to the error page
    await page.waitForURL('/auth/error');
    expect(page.url()).toContain('/auth/error');
  });
});
