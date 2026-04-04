import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjectModel/login.page';
import { InventoryPage } from '../PageObjectModel/Inventory.page';
import testData from '../data/TestData.json';

test('E2E Checkout: Standard Purchase Journey', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(testData.users.valid.username, testData.users.valid.password);

  await inventoryPage.addItem(testData.products.backpack);
  await inventoryPage.goToCart();

  await page.getByRole('button', { name: 'Checkout' }).click();
  
  await page.getByPlaceholder('First Name').fill(testData.customer.firstName);
  await page.getByPlaceholder('Last Name').fill(testData.customer.lastName);
  await page.getByPlaceholder('Zip/Postal Code').fill(testData.customer.zipCode);
  
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();

  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
});