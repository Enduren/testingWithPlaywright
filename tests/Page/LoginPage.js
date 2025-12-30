class LoginPage {

    constructor(page) {
        this.page = page;
        this.userEmail = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.submitBtn = page.locator("[value='Login']");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password) {
        await this.userEmail.fill(username);
        await this.password.fill(password);
        await this.submitBtn.click();
        // Wait for the network to settle to ensure login is complete
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };