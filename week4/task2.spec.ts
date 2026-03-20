import { test, expect } from '@playwright/test'
import studentData from '../testdata/student.json'

test('Submit multiple student registrations', async ({ page }) => {

    await page.goto('https://demoqa.com/automation-practice-form')

    for (const student of studentData) {

        await page.fill('#firstName', student.firstName)
        await page.fill('#lastName', student.lastName)
        await page.fill('#userEmail', student.email)

        const gender = student.gender

        if (gender === "Male") {
            await page.locator('label[for="gender-radio-1"]').click()
        }
        else if (gender === "Female") {
            await page.locator('label[for="gender-radio-2"]').click()
        }
        else {
            await page.locator('label[for="gender-radio-3"]').click()
        }

        await page.fill('#userNumber', student.mobile)

        await page.click('#dateOfBirthInput')

        await page.locator('.react-datepicker__year-select').selectOption(student.dob.year)
        await page.locator('.react-datepicker__month-select').selectOption(student.dob.month)
        await page.locator(`.react-datepicker__day--0${student.dob.day}`).first().click()

        await page.click('#submit')

        await expect(page.locator('#example-modal-sizes-title-lg'))
            .toHaveText('Thanks for submitting the form')

        await page.screenshot({ path: "student.png" })
        await page.keyboard.press("Escape")
    }

})