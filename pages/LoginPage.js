import { test } from '@playwright/test';
class LoginPage {

    constructor(page)
    {
        this.page = page;

        this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login');
        this.message = page.locator('.welcome_menu');
        this.errorMessage = page.locator('.auth_error');
    }

    async attachScreenshot(name) {
        await test.info().attach(name, {
        body: await this.page.screenshot(),
        contentType: 'image/png',
        });
    }

    async gotoURL()
    {
        await this.page.goto('https://adactinhotelapp.com/');
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.attachScreenshot('02 - After entering username');

        await this.password.fill(password);
        await this.attachScreenshot('03 - After entering password');
        
        await this.loginButton.click();
        await this.attachScreenshot('04 - After clicking Login');
    }

}
export default LoginPage;