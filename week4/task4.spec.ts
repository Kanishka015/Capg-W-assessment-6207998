import { test, expect } from '@playwright/test'
import userData from '../testdata/bookuser.json'

test('Register, Login and Add Book to Collection', async ({ page }) => {

    await page.goto('https://demoqa.com/books')

    await page.click('#login')

    await page.click('#newUser')

    await page.fill('#firstname', userData.firstName)
    await page.fill('#lastname', userData.lastName)
    await page.fill('#userName', userData.username)
    await page.fill('#password', userData.password)

    console.log("Solve captcha manually and press Register")


    await page.click('#register')

    //   await page.waitForEvent('/page/')

    page.once('dialog', async dialog => {
        console.log(dialog.message())
        await dialog.accept()
    })
    await page.goto('https://demoqa.com/login')

    await page.fill('#userName', userData.username)
    await page.fill('#password', userData.password)

    await page.click('#login')

    await expect(page.locator('#userName-value')).toContainText(userData.username)

    await page.goto('https://demoqa.com/books')

    await page.click('text=Book Store')

    await page.fill('#searchBox', userData.bookName)

    await page.click(`text=${userData.bookName}`)

    // page.once('dialog', async dialog => {
    //     await dialog.accept()
    // })


    await page.click('text=Add To Your Collection')

    // await page.click('text=Profile')
    await page.goto('https://demoqa.com/profile')

    await expect(page.locator('a[href="/books?search=9781449325862"]')).toBeVisible()

    await page.click('#submit')

    await expect(page.locator('#login')).toBeVisible()

    await page.screenshot({path:"books.png"})

})