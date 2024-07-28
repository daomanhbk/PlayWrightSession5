import { expect, Locator, Page } from "@playwright/test";

export class HeaderPage {
    readonly page: Page;
    readonly titleLbl: Locator;
    readonly cardBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.titleLbl = page.locator('[data-test="title"]');
    }

    // Verify the page title is displayed
    async VerifyThePageTitleIsDisplayed(pageTitle: string) {
        await expect(this.titleLbl).toContainText(pageTitle);        
    }
}