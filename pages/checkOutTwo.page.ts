import { expect, Locator, Page } from "@playwright/test";

export class CheckOutTwoPage {
    readonly page: Page;
    readonly itemNameLbl: Locator;
    readonly itemDescriptionLbl: Locator;
    readonly itemPriceLbl: Locator;
    readonly finishBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.itemNameLbl = page.locator('[data-test="inventory-item-name"]');
        this.itemDescriptionLbl = page.locator('[data-test="inventory-item-desc"]');
        this.itemPriceLbl = page.locator('[data-test="inventory-item-price"]');
        this.finishBtn = page.locator('[data-test="finish"]');
    }

    // Validate checkout page has item added earlier
    async ValidateTheCheckOutPageHasItemAddedEarlier(itemName: string, itemDescription: string, itemPrice: string) {
        await expect(this.itemNameLbl).toContainText(itemName);
        await expect(this.itemDescriptionLbl).toContainText(itemDescription);
        await expect(this.itemPriceLbl).toContainText(itemPrice);
    }

    // Click on Continue button
    async ClickFinishButton() {
        await this.finishBtn.click();
    }
}