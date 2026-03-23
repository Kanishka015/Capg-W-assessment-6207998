import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjectModel/login.page';
import { InventoryPage } from '../PageObjectModel/Inventory.page';
import testData from '../data/TestData.json';

test('Integration: Cart badge persists across navigation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(testData.users.valid.username, testData.users.valid.password);

  await inventoryPage.addItem(testData.products.backpack);
  await expect(inventoryPage.cartBadge).toHaveText('1');

  await inventoryPage.goToCart();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  
  await expect(inventoryPage.cartBadge).toHaveText('1');
});