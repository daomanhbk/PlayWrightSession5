import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly itemNameLbl: Locator;
    readonly itemDescriptionLbl: Locator;
    readonly itemPriceLbl: Locator;
    readonly checkOutBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.itemNameLbl = page.locator('[data-test="inventory-item-name"]');
        this.itemDescriptionLbl = page.locator('[data-test="inventory-item-desc"]');
        this.itemPriceLbl = page.locator('[data-test="inventory-item-price"]');
        this.checkOutBtn = page.locator('[data-test="checkout"]');
    }

    // Verify the pre-added item name is visible
    async VerifyThePreAddedItemIsVisible(itemName: string, itemDescription: string, itemPrice: string) {
        await expect(this.itemNameLbl).toContainText(itemName);
        await expect(this.itemDescriptionLbl).toContainText(itemDescription);    
        await expect(this.itemPriceLbl).toContainText(itemPrice);
    }

    // Click on CheckOut button
    async ClickCheckOutButton() {
        await this.checkOutBtn.click();
    }
}