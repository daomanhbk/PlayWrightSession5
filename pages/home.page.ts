import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly cardBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.cardBtn = page.locator('[data-test="shopping-cart-link"]');
    }

    // Get item name
    async GetItemName(item: number) {
        let itemName = await this.page.locator(`(//div[@data-test="inventory-item-name"])[${item}]`).innerText();
        return itemName;
    }

    // Get item description
    async GetItemDescription(item: number) {
        let itemDescription = await this.page.locator(`(//div[@data-test="inventory-item-desc"])[${item}]`).innerText();
        return itemDescription;
    }

    // Get item price
    async GetItemPrice(item: number) {
        let itemPrice = await this.page.locator(`(//div[@data-test="inventory-item-price"])[${item}]`).innerText();
        return itemPrice;
    }

    // Click on Add to Cart button
    async ClickAddToCartButton(item: number) {
        const addToCartBtn = this.page.locator(`(//button[contains(@class,"btn_inventory")])[${item}]`);
        await addToCartBtn.click();
    }

    // Click on Cart button
    async ClickCartButton() {
        await this.cardBtn.click();
    }
}