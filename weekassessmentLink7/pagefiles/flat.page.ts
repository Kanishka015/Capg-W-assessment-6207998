import { Locator, Page } from "@playwright/test";
class BookFlat {
  page: Page;
  locationLink: Locator;
  constructor(page: Page) {
    this.page = page;
    this.locationLink = this.page.locator(
      '//a[@class="mb-header__main__link js-menu-link"]',
    );
  }
  //choosing flat location
  async chooseLocation() {
    await this.locationLink.hover();
    await this.page.getByText("Kota").click();
  }
  //selcting the first propery
  async rentFlat() {
    await this.page.locator("div#tabRENT").click();
    let [detailPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.page
        .locator("//div[@class='mb-home__owner-prop__card--graphic']")
        .click(),
    ]);
    return detailPage;
  }
  //downing the property brochure
  async downloadPropertyBrochure(page: Page) {
    await page.getByText("Download Brochure").click();

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByText("No").click(),
    ]);

    await download.saveAs(`downloads/${download.suggestedFilename()}`);
  }
  //checking the property availabiliy
  async checkFlatAvailabilty(page: Page) {
    await this.page.getByText("Check Availability").first().click();
  }
}
export default BookFlat;