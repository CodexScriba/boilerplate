import { test, expect } from '@playwright/test';

test.describe('Forgot Password Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/forgot-password');
  });

  test('should display the forgot password form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
    await expect(page.getByText('Enter your email address and we will send you a link')).toBeVisible();
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset Password' })).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    // Try submitting an empty form
    await page.getByRole('button', { name: 'Reset Password' }).click();
    await expect(page.getByText('Email is required')).toBeVisible();
    
    // Try an invalid email format
    await page.getByLabel('Email address').fill('invalid-email');
    await page.getByRole('button', { name: 'Reset Password' }).click();
    await expect(page.getByText('Invalid email address')).toBeVisible();
  });

  test('should submit the form with valid email', async ({ page }) => {
    // Intercept the form submission
    const submitPromise = page.waitForRequest(request => {
      return request.url().includes('/api/forgot-password') && request.method() === 'POST';
    });
    
    // Fill in a valid email
    await page.getByLabel('Email address').fill('test@example.com');
    
    // Submit the form
    await page.getByRole('button', { name: 'Reset Password' }).click();
    
    // Wait for the request to be sent
    await submitPromise;
    
    // Check button state during submission
    await expect(page.getByRole('button', { name: 'Sending...' })).toBeVisible();
    
    // Verify that the form is reset after successful submission
    await expect(page.getByLabel('Email address')).toHaveValue('');
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock an API error response
    await page.route('**/api/forgot-password', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' }),
      });
    });
    
    // Fill in a valid email
    await page.getByLabel('Email address').fill('test@example.com');
    
    // Submit the form and wait for the error message
    await page.getByRole('button', { name: 'Reset Password' }).click();
    
    // Check for the error message
    await expect(page.getByText('Failed to send reset link. Please try again.')).toBeVisible();
  });
});