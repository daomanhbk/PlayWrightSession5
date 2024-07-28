import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly userNameTxt: Locator;
    readonly passwordTxt: Locator;
    readonly loginBtn: Locator;
    readonly errorMessageMsg: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.userNameTxt = page.locator('[data-test="username"]');
        this.passwordTxt = page.locator('[data-test="password"]');
        this.loginBtn = page.locator('[data-test="login-button"]');
        this.errorMessageMsg = page.locator('[data-test="error"]');
    }

    // Go to page
    async gotoUrl() {
        await this.page.goto('/'); //process.env.BASE_URL!
    }

    // Input username and password
    async InputUsernameAndPassword(username: string, password: string) {
        await this.userNameTxt.fill(username);
        await this.passwordTxt.fill(password);
    }

    // Click on Login button
    async ClickLoginButton() {
        await this.loginBtn.click();
    }

    // Verify the error message is displayed
    async VerifyTheErrorMessageIsDisplayed(errorMessage: string) {
        await expect(this.errorMessageMsg).toContainText(errorMessage);        
    }
}