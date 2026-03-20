import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjectModel/login.page';
import { InventoryPage } from '../PageObjectModel/inventory.page';
import testData from '../data/TestData.json';

test('Integration: Item count persists across page navigation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(testData.users.valid.username, testData.users.valid.password);

  // 1. Add item and verify badge
  await inventoryPage.addItem('Sauce Labs Backpack');
  await expect(inventoryPage.cartBadge).toHaveText('1');

  // 2. Navigate away to Cart and then return to Products
  await inventoryPage.goToCart();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // 3. Verify badge still shows '1' after returning
  await expect(inventoryPage.cartBadge).toHaveText('1');
});