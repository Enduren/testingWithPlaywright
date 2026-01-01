const { expect } = require('@playwright/test');

class OrdersHistoryPage {
    // 1. Create a constructor to receive and store the page object
    constructor(page) {
        this.page = page;
    }

    async expectThanks() {
        // 2. Use 'this.page' instead of just 'page'
        await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    }

    async searchOrderAndSelect() {
        // Extract the Order ID and store it in 'this' so other methods can see it
        this.orderId = await this.page.locator("//tr[@class='ng-star-inserted']//td[@class='em-spacer-1']").textContent();
        console.log(this.orderId);

        await this.page.locator("button[routerlink*='myorders']").click();
        await this.page.locator("tbody").waitFor();
        const rows = this.page.locator("tbody tr");

        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            // Use this.orderId which we captured above
            if (this.orderId.includes(rowOrderId.trim())) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async expectOrderId() {
        // Access the captured orderId and the current page details
        const orderIdDetails = await this.page.locator(".col-text").textContent();
        expect(this.orderId).toContain(orderIdDetails.trim());
    }
}

module.exports = { OrdersHistoryPage };