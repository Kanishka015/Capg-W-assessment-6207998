import {selectors, test} from "@playwright/test"
import { TIMEOUT } from "dns"
import { text } from "stream/consumers"

test("cricbuzz", async ({page}) => {
await page.goto("https://www.cricbuzz.com/")
await page.locator("//a[@title='Live Cricket Score']").click()
await page.waitForEvent("load")

await page.locator("(//a[@class='w-full bg-cbWhite flex flex-col p-3 gap-1'])[1]").click()
await page.waitForEvent("load")

await page.locator("//a[@title='Scorecard']").click()
await page.waitForEvent("load")
    
   let a = await page.locator("(//a[@class='text-cbTextLink hover:underline text-sm tb:text-xs wb:text-sm'])[1]").textContent()
    console.log(a);
    
   let b = await page.locator("(//div[@class='flex justify-center items-center font-bold text-sm  wb:text-sm'])[1]").textContent()
    console.log(b);

    await page.screenshot({path:"cricbuzzscorecard.png", fullPage:true})

})