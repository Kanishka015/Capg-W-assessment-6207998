import { test} from "@playwright/test";

test("flipkart", async ({ page }) => {
  await page.goto("https://www.flipkart.com/");

  await page.locator("//input[@name='q' and not(@readonly)]").fill("phones");
  await page.locator("//input[@name='q' and not(@readonly)]").press("Enter");
  await page.waitForTimeout(5000)
  await page.locator("(//div[@title='Apple'])[1]").click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(5000)
  const thirdProductCard = page.locator("//div[contains(@data-id,'MOB')]").nth(2);
  const thirdProductPrice = thirdProductCard.locator("xpath=.//div[contains(text(),'₹')]").first();
  await page.waitForTimeout(5000)
  const price = await thirdProductPrice.textContent();
  console.log(`3rd Apple phone price: ${price?.trim()}`);
  
    await page.screenshot({path:"flipkart.png", fullPage:true})
});