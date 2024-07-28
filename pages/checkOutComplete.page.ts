import { expect, Locator, Page } from "@playwright/test";

export class CheckOutCompletePage {
    readonly page: Page;
    readonly thankYouMessageLbl: Locator;
    readonly completeMessageLbl: Locator;

    constructor(page: Page){
        this.page = page;
        this.thankYouMessageLbl = page.locator('[data-test="complete-header"]');
        this.completeMessageLbl = page.locator('[data-test="complete-text"]');
    }
    
    // Validate the thank you message
    async ValidateTheThankYouMessage(thankyouMessage: string) {
        await expect(this.thankYouMessageLbl).toContainText(thankyouMessage);
    }

    // Validate the Complete message
    async ValidateTheCompleteMessage(completeMessage: string) {
        await expect(this.completeMessageLbl).toContainText(completeMessage);
    }
}