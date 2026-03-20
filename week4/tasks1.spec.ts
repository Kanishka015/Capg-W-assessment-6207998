import { test, expect } from '@playwright/test';
import productData from '../testdata/data.json';

test('Search multiple products and validate details', async ({ page }) => {

  await page.goto('https://www.amazon.in');

  const products = productData.products;

  for (const product of products) {

    await page.locator('#twotabsearchtextbox').fill(product);

    await page.locator('#nav-search-submit-button').click();

    await page.waitForSelector('div[data-component-type="s-search-result"]');

    const firstProduct = page.locator('div[data-component-type="s-search-result"]').first();
    const productTitle = await firstProduct.locator('h2 span').first().textContent();

    console.log("Product from search:", productTitle);

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator("//a[@class='a-link-normal s-line-clamp-2 puis-line-clamp-3-for-col-4-and-8 s-link-style a-text-normal']").first().click()
    ]);

    await newPage.waitForLoadState();

    const title = await newPage.locator('span#productTitle').first().textContent();
    console.log("Product title:", title);
    await expect(newPage.locator('span#productTitle').first()).toBeVisible();

    const price = newPage.locator('#apex-pricetopay-accessibility-label');
    await expect(price).toBeVisible();

    const rating = newPage.locator('span#acrPopover').first();
    await expect(rating).toBeVisible()
    await newPage.close();

    await page.bringToFront();
  }
  await page.screenshot({path:"amazon.png"})

});