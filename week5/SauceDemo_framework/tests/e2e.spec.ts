import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjectModel/login.page';
import { InventoryPage } from '../PageObjectModel/inventory.page';
import testData from '../data/TestData.json';

//multiple item removal then checkout E2Escenario 2

test('E2E: Add multiple items, remove one, and complete purchase', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // 1. Login
  await loginPage.goto();
  await loginPage.login(testData.users.valid.username, testData.users.valid.password);

  // 2. Add two different items
  await inventoryPage.addItem('Sauce Labs Backpack');
  await inventoryPage.addItem('Sauce Labs Bike Light');
  await expect(inventoryPage.cartBadge).toHaveText('2');

  // 3. Remove one item directly from the inventory page
  // Note: We use the same logic as addItem but look for the "Remove" button
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await expect(inventoryPage.cartBadge).toHaveText('1');

  // 4. Go to cart and finish checkout
  await inventoryPage.goToCart();
  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByPlaceholder('First Name').fill('Tester');
  await page.getByPlaceholder('Last Name').fill('Account');
  await page.getByPlaceholder('Zip/Postal Code').fill('302022');
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
});