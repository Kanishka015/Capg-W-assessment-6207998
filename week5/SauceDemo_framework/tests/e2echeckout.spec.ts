import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjectModel/login.page';
import { InventoryPage } from '../PageObjectModel/inventory.page';
import testData from '../data/TestData.json';

//login-> add item-> go to cart verify->add details-> place ordr
test('End-to-End Checkout Journey', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // 1. Login
  await loginPage.goto();
  await loginPage.login(testData.users.valid.username, testData.users.valid.password);

  // 2. Add item to cart
  await inventoryPage.addItem('Sauce Labs Backpack');

  // 3. Go to cart and verify
  await inventoryPage.goToCart();
  await expect(page.getByText('Your Cart')).toBeVisible();

  // 4. Checkout steps
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByPlaceholder('First Name').fill('Automation');
  await page.getByPlaceholder('Last Name').fill('Tester');
  await page.getByPlaceholder('Zip/Postal Code').fill('302022');
  await page.getByRole('button', { name: 'Continue' }).click();

  // 5. Finish
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
});