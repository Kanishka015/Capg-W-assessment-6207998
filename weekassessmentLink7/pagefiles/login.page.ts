import { Locator, Page } from '@playwright/test';
import fs from 'fs';

const loginData = JSON.parse(
  fs.readFileSync('./test-data/login.json', 'utf-8')
);

class LoginPage {
  page: Page;
  loginHover: Locator;
  loginSignUp: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginHover = page.getByText('Login', { exact: true });
    this.loginSignUp = page.getByText('Login/Sign Up');
  }
//User login with page.pause for manual captcha and Otp verification
  async login() {
    await this.loginHover.last().hover();

    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.loginSignUp.click()
    ]);

    await popup.waitForLoadState('domcontentloaded');

    await popup.locator('#emailOrMobileLable')
      .fill(loginData.mobile);
    await popup.pause();
    await popup.getByText('Next').click();
    await popup.pause();
    await popup.locator("//button[@onclick='verifyOtp()']")
      .click();
  }
}

export default LoginPage;