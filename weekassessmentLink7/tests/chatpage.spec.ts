import { test, expect } from '@playwright/test';
import LoginPage from "../pages/login.page";
import Home from '../pages/Home.page';
import Chat from '../pages/chat.page';
test('Chat with us', async ({ page }) => {
  await page.goto('https://www.magicbricks.com/');
    const loginPage=new LoginPage(page);
    const homePage=new Home(page);
    await loginPage.login();
    let chatPage=await homePage.chatWithUs();
    const chatWithUsPage=new Chat(chatPage);
    await chatWithUsPage.sendText();
});