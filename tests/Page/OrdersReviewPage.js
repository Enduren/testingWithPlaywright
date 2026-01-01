const { expect } = require("@playwright/test");

class OrdersReviewPage {
    // 1. You must initialize the page object in the constructor
    constructor(page) {
        this.page = page;
        this.countryInput = page.locator("//input[@placeholder='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit =  page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async searchCountryAndSelect(countryCode, countryName) {
        // 2. Use 'this.page' or the locators defined in constructor
        await this.countryInput.pressSequentially(countryCode, { delay: 150 });
        
        await this.dropdown.waitFor();
        const options = this.dropdown.locator("button");
        const optionsCount = await options.count();

        for (let i = 0; i < optionsCount; ++i) {
            const text = await options.nth(i).textContent();
            
            // 3. Use .trim() to remove extra spaces/newlines often found in HTML
            if (text.trim() === countryName) {
                await options.nth(i).click();
                break;
            }
        }
    }

    async SubmitAndGetOrderId()
    {
     await this.submit.click();
     await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
     return await this.orderId.textContent();
    }
}

module.exports = { OrdersReviewPage };