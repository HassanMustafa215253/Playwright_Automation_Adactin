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

    async gotoURL()
    {
        await this.page.goto('https://adactinhotelapp.com/');
    }

    async login(username, password)
    {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

}
export default LoginPage;