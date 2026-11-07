# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: negative.spec.js >> TC07 - Login with invalid username/password
- Location: tests\negative.spec.js:10:1

# Error details

```
Error: page.screenshot: Target page, context or browser has been closed
Call log:
  - taking page screenshot
  - waiting for fonts to load...
  - fonts loaded

```

# Test source

```ts
  1  | import { test } from '@playwright/test';
  2  | class LoginPage {
  3  | 
  4  |     constructor(page)
  5  |     {
  6  |         this.page = page;
  7  | 
  8  |         this.username = page.locator('#username');
  9  |         this.password = page.locator('#password');
  10 |         this.loginButton = page.locator('#login');
  11 |         this.message = page.locator('.welcome_menu');
  12 |         this.errorMessage = page.locator('.auth_error');
  13 |     }
  14 | 
  15 |     async attachScreenshot(name) {
  16 |         await test.info().attach(name, {
> 17 |         body: await this.page.screenshot(),
     |                               ^ Error: page.screenshot: Target page, context or browser has been closed
  18 |         contentType: 'image/png',
  19 |         });
  20 |     }
  21 | 
  22 |     async gotoURL()
  23 |     {
  24 |         await this.page.goto('https://adactinhotelapp.com/');
  25 |     }
  26 | 
  27 |     async login(username, password) {
  28 |         await this.username.fill(username);
  29 |         await this.attachScreenshot('02 - After entering username');
  30 | 
  31 |         await this.password.fill(password);
  32 |         await this.attachScreenshot('03 - After entering password');
  33 |         
  34 |         await this.loginButton.click();
  35 |         await this.attachScreenshot('04 - After clicking Login');
  36 |     }
  37 | 
  38 | }
  39 | export default LoginPage;
```