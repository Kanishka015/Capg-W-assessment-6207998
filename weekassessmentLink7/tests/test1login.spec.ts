import { test, expect } from '@playwright/test';
import LoginPage from "../pages/login.page"
import BookFlat from '../pages/flat.page';
test('Login', async ({ page,context }) => {
    await page.goto("https://www.magicbricks.com/")
    const loginPage=new LoginPage(page);
    const bookingPage=new BookFlat(page);
    await loginPage.login();
    await bookingPage.chooseLocation();
    const detailPage=await bookingPage.rentFlat();
    await bookingPage.downloadPropertyBrochure(detailPage);
});