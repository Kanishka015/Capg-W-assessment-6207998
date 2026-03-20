import { test, expect } from '@playwright/test'
import profileData from '../testdata/profiledata.json'

test('Validate user profile update', async ({ page }) => {

  await page.goto('https://demoqa.com/login')

  await page.fill('#userName', profileData.username)
  await page.fill('#password', profileData.password)

  await page.click('#login')

  await expect(page.locator('#userName-value'))
    .toContainText(profileData.username)

  await page.goto('https://demoqa.com/profile')

  console.log("Profile page loaded for user:", profileData.username)

  await expect(page.locator('#userName-value'))
    .toContainText(profileData.username)

  await page.click('#submit')

  await expect(page.locator('#login')).toBeVisible()

  await page.screenshot({path:"login.png"})

})