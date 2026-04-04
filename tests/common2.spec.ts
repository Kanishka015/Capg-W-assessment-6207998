import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjectModel/login.page';
import { InventoryPage } from '../PageObjectModel/Inventory.page';
import testData from '../data/TestData.json';

test('Common 2: Checkout form prevents submission with missing information', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(testData.users.valid.username, testData.users.valid.password);

  await inventoryPage.addItem(testData.products.onesie);
  await inventoryPage.goToCart();
  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByPlaceholder('Last Name').fill(testData.customer.lastName);
  await page.getByPlaceholder('Zip/Postal Code').fill(testData.customer.zipCode);
  await page.getByRole('button', { name: 'Continue' }).click();

  const errorMsg = page.locator('[data-test="error"]');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toContainText('First Name is required');
});