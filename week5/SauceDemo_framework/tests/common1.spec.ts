import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjectModel/login.page';
import { InventoryPage } from '../PageObjectModel/Inventory.page';
import testData from '../data/TestData.json';

test('Common 1: User can sort products by price (Low to High)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(testData.users.valid.username, testData.users.valid.password);

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const priceStrings = await page.locator('.inventory_item_price').allTextContents();
  const prices = priceStrings.map(p => parseFloat(p.replace('$', '')));
  const minPrice = Math.min(...prices);
  
  expect(prices[0]).toBe(minPrice);
});