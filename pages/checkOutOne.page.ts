import { expect, Locator, Page } from "@playwright/test";

export class CheckOutOnePage {
    readonly page: Page;
    readonly firstNameTxt: Locator;
    readonly lastNameTxt: Locator;
    readonly zipCodeTxt: Locator;
    readonly continueBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.firstNameTxt = page.locator('[data-test="firstName"]');
        this.lastNameTxt = page.locator('[data-test="lastName"]');
        this.zipCodeTxt = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
    }

    // Input first name, last name, and Zip Code
    async InputAllRequiredFields(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameTxt.fill(firstName);
        await this.lastNameTxt.fill(lastName);
        await this.zipCodeTxt.fill(zipCode);
    }

    // Validate the corresponding fields
    async ValidateTheCorrespondingFieldsDisplayInputText(firstName: string, lastName: string, zipCode: string) {
        await expect(this.firstNameTxt).toHaveValue(firstName);
        await expect(this.lastNameTxt).toHaveValue(lastName);
        await expect(this.zipCodeTxt).toHaveValue(zipCode);
    }

    // Click on Continue button
    async ClickContinueButton() {
        await this.continueBtn.click();
    }
}