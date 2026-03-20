import {selectors, test} from "@playwright/test"

test("icc", async ({page}) => {
    await page.goto("https://www.icc-cricket.com/rankings/batting/womens/odi")


     await page.waitForTimeout(1000)

     await page.locator("//button[text()='Accept All Cookies']").click()

  let b = await page.locator("//span[@class='text-xs leading-140 font-medium capitalize text-primary']").nth(0).textContent()
    console.log(b);

    let a = await page.locator("//span[@class=\"text-sm lg:text-2xl leading-140 uppercase font-extrabold text-primary tracking-wide\"]").nth(0).textContent()
    console.log(a);
    await page.screenshot({path: "icc.png"})

})