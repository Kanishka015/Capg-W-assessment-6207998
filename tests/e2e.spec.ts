import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjectModel/login.page';
import { InventoryPage } from '../PageObjectModel/Inventory.page';
import testData from '../data/TestData.json';

test('E2E: Add multiple items, remove one, and complete purchase', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(testData.users.valid.username, testData.users.valid.password);

  await inventoryPage.addItem(testData.products.backpack);
  await inventoryPage.addItem(testData.products.bikeLight);
  await expect(inventoryPage.cartBadge).toHaveText('2');

  const bikeLightId = testData.products.bikeLight.toLowerCase().replace(/ /g, '-');
  await page.locator(`[data-test="remove-${bikeLightId}"]`).click();
  await expect(inventoryPage.cartBadge).toHaveText('1');

  await inventoryPage.goToCart();
  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByPlaceholder('First Name').fill(testData.customer.firstName);
  await page.getByPlaceholder('Last Name').fill(testData.customer.lastName);
  await page.getByPlaceholder('Zip/Postal Code').fill(testData.customer.zipCode);
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
});