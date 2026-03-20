import {selectors, test} from "@playwright/test"
import { time } from "node:console"

test("qspider", async ({page}) => {
    await page.goto("https://demoapps.qspiders.com/ui?scenario=1")

    await page.locator("//input[@placeholder='Enter your name']").fill("Nikhil")
        await page.locator("//input[@placeholder='Enter Your Email']").fill("Nikhil@gmail.com")
    await page.locator("//input[@placeholder='Enter your password']").fill("Nikhil@123")

    
    await page.locator("//button[.='Register']").click()
    await page.locator("//input[@placeholder='Enter your email']").fill("Nikhil@gmail.com")

    await page.locator("//input[@name='password']").fill("Nikhil@123")

    await page.locator("//button[@type='submit']").click()
    await page.waitForTimeout(5000)
    await page.screenshot({path:"qspider.png", fullPage:true})

})