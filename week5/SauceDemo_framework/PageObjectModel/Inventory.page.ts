import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly headerTitle: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link'); 
  }

  async addItem(itemName: string) {
    const id = itemName.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="add-to-cart-${id}"]`).click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}