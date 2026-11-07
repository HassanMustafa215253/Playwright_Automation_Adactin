# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: negative.spec.js >> TC08 - Search hotel without selecting mandatory fields
- Location: tests\negative.spec.js:24:1

# Error details

```
Error: page.goto: Test ended.
Call log:
  - navigating to "https://adactinhotelapp.com/", waiting until "load"

```

# Test source

```ts
  1  | class LoginPage {
  2  | 
  3  |     constructor(page)
  4  |     {
  5  |         this.page = page;
  6  | 
  7  |         this.username = page.locator('#username');
  8  |         this.password = page.locator('#password');
  9  |         this.loginButton = page.locator('#login');
  10 |         this.message = page.locator('.welcome_menu');
  11 |         this.errorMessage = page.locator('.auth_error');
  12 |     }
  13 | 
  14 |     async gotoURL()
  15 |     {
> 16 |         await this.page.goto('https://adactinhotelapp.com/');
     |                         ^ Error: page.goto: Test ended.
  17 |     }
  18 | 
  19 |     async login(username, password)
  20 |     {
  21 |         await this.username.fill(username);
  22 |         await this.password.fill(password);
  23 |         await this.loginButton.click();
  24 |     }
  25 | 
  26 | }
  27 | export default LoginPage;
```