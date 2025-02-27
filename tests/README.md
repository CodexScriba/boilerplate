# Playwright Tests

This directory contains Playwright tests for the application.

## Running Tests

You can run the tests using the following npm scripts:

```bash
# Run all tests
npm test

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

## Test Structure

- `auth/` - Tests for authentication flows
  - `confirm.spec.ts` - Tests for the email confirmation route

## Helpers

- `helpers/supabase-mocks.ts` - Utilities for mocking Supabase responses in tests

## Configuration

The Playwright configuration is in `playwright.config.ts` at the root of the project. It includes:

- Test directory configuration
- Browser configurations (Chromium, Firefox, WebKit)
- Web server setup to run the Next.js development server during tests

## Adding New Tests

To add a new test:

1. Create a new `.spec.ts` file in the appropriate directory
2. Import the necessary Playwright test utilities
3. Write your tests using the Playwright API
4. Run the tests using one of the npm scripts

## Best Practices

- Mock external dependencies like Supabase
- Test both success and failure scenarios
- Keep tests isolated and independent
- Use descriptive test names
