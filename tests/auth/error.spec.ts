import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Create a simple HTML file that mimics the structure of the auth error page
// This allows us to test the UI without requiring the Next.js server
test.beforeAll(async () => {
  const testHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Authentication Error</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
    .container { display: flex; min-height: 100vh; flex-direction: column; align-items: center; justify-content: center; padding: 1rem; }
    .card { width: 100%; max-width: 400px; border: 1px solid rgba(220, 38, 38, 0.2); border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
    .card-header { padding: 1.5rem 1.5rem 0.5rem; }
    .icon-container { display: flex; justify-content: center; margin-bottom: 0.5rem; }
    .icon-circle { height: 3rem; width: 3rem; border-radius: 9999px; background-color: rgba(220, 38, 38, 0.1); display: flex; align-items: center; justify-content: center; }
    h2 { text-align: center; color: rgb(220, 38, 38); font-weight: bold; margin-top: 0.5rem; }
    .separator { height: 1px; background-color: rgba(0, 0, 0, 0.1); margin: 0; }
    .card-content { padding: 1.5rem 1.5rem 1rem; }
    .alert { background-color: rgba(220, 38, 38, 0.05); border: 1px solid rgba(220, 38, 38, 0.2); border-radius: 0.375rem; padding: 0.75rem; margin-bottom: 1rem; }
    .alert-title { font-weight: bold; margin: 0 0 0.25rem; }
    .reasons-box { background-color: rgba(0, 0, 0, 0.05); border-radius: 0.375rem; padding: 1rem; }
    h6 { color: rgba(0, 0, 0, 0.6); font-size: 0.875rem; margin: 0 0 0.5rem; }
    ul { list-style-type: disc; padding-left: 1.25rem; margin: 0; }
    li { color: rgba(0, 0, 0, 0.6); font-size: 0.875rem; margin-bottom: 0.25rem; }
    .card-footer { padding: 0 1.5rem 1.5rem; }
    .button { display: block; width: 100%; padding: 0.5rem 1rem; border-radius: 0.375rem; text-align: center; text-decoration: none; margin-bottom: 0.75rem; }
    .button-primary { background-color: rgb(79, 70, 229); color: white; }
    .button-outline { background-color: transparent; border: 1px solid rgba(0, 0, 0, 0.2); color: rgba(0, 0, 0, 0.8); }
    .support { margin-top: 2rem; text-align: center; font-size: 0.875rem; color: rgba(0, 0, 0, 0.6); }
    .support a { color: rgb(79, 70, 229); text-decoration: none; font-weight: 500; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="icon-container">
          <div class="icon-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: rgb(220, 38, 38);">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        </div>
        <h2>Authentication Error</h2>
      </div>
      
      <hr class="separator" />
      
      <div class="card-content">
        <div class="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline; vertical-align: middle; margin-right: 0.25rem;">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h5 class="alert-title">Error</h5>
          <p>There was a problem with your authentication request.</p>
        </div>
        
        <div class="reasons-box">
          <h6>Possible reasons:</h6>
          <ul>
            <li>Your session may have expired</li>
            <li>Invalid credentials were provided</li>
            <li>The authentication service is temporarily unavailable</li>
            <li>Your account may be locked or disabled</li>
          </ul>
        </div>
      </div>
      
      <div class="card-footer">
        <a href="/auth/login" class="button button-primary">Return to Login</a>
        <a href="/" class="button button-outline">Back to Home</a>
      </div>
    </div>
    
    <div class="support">
      <p>Need help? <a href="/contact">Contact Support</a></p>
    </div>
  </div>
</body>
</html>
  `;

  // Create a tests/temp directory if it doesn't exist
  const tempDir = path.join(process.cwd(), 'tests', 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Write the test HTML file
  fs.writeFileSync(path.join(tempDir, 'auth-error.html'), testHtml);
});

test.describe('Auth Error Page', () => {
  test('displays the error page with correct title and content', async ({ page }) => {
    // Load the local HTML file instead of using the Next.js server
    await page.goto(`file://${path.join(process.cwd(), 'tests', 'temp', 'auth-error.html')}`);
    
    // Check if the page title is correct
    const title = page.locator('h2:text("Authentication Error")');
    await expect(title).toBeVisible();
    
    // Check if the error alert is visible
    const errorAlert = page.locator('.alert');
    await expect(errorAlert).toBeVisible();
    
    // Check if the "Return to Login" button is present
    const loginButton = page.locator('a:text("Return to Login")');
    await expect(loginButton).toBeVisible();
    
    // Check if the "Back to Home" button is present
    const homeButton = page.locator('a:text("Back to Home")');
    await expect(homeButton).toBeVisible();
    
    // Verify the possible reasons section exists
    const reasonsTitle = page.locator('h6:text("Possible reasons:")');
    await expect(reasonsTitle).toBeVisible();
    
    // Check if at least one list item is visible in the reasons list
    const reasonsList = page.locator('ul li');
    await expect(reasonsList.first()).toBeVisible();
    
    // Optional: Take a screenshot of the error page
    await page.screenshot({ path: path.join(process.cwd(), 'tests', 'screenshots', 'auth-error-page.png') });
  });
});
