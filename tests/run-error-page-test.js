// Simple script to run just the error page test without starting the Next.js server
const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('Running Auth Error Page test...');
  execSync('npx playwright test tests/auth/error.spec.ts', { 
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
  console.log('Test completed successfully!');
} catch (error) {
  console.error('Test failed with error:', error.message);
  process.exit(1);
}
