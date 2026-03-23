import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjectModel/login.page';
import testData from '../data/TestData.json';

test('E2E Scenario 3: Locked out user cannot log in', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  // We use the "locked" user from your JSON data here
  await loginPage.login(testData.users.locked.username, testData.users.locked.password);

  const errorMsg = page.locator('[data-test="error"]');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toContainText('Sorry, this user has been locked out');
});