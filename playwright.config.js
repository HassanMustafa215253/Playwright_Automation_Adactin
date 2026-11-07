const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  workers: 1,
  reporter: 'html',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    // screenshot: 'only-on-failure',
    // video: 'on',
  },
});