import {selectors, test} from "@playwright/test"
import { text } from "stream/consumers"

test("tokyo olympics", async ({page}) => {
await page.goto("https://www.olympics.com/en/olympic-games/tokyo-2020")
await page.locator("//button[@id='onetrust-accept-btn-handler']").click()

await page.locator("//p[@data-cy='ocs-text-module']").click()



    

    
    let b = await page.locator("//span[@class='Medal-styles__Medal-sc-645148e1-1 fqHqIZ'][@data-cy='medal-main']/span[@data-cy='ocs-text-module'][@class='OcsText-styles__StyledText-sc-bf256156-0 cjPVFu text--sm-body'][text()='2']").nth(2).textContent()
    console.log(b);
    await page.waitForTimeout(5000)



    await page.screenshot({path:"olympics.png", fullPage:true})

})