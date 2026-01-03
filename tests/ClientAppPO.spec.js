 const {test, expect} = require('@playwright/test');
  const loginData = require('../loginData.json');
 const {POManager}=require('../tests/Page/POManager')

 test('Client App login', async ({page})=>
 {
   const poManager = new POManager(page);
   const loginPage = poManager.getLoginPage();
    const productName = 'Zara Coat 3';
    await loginPage.goTo();
    await loginPage.validLogin(loginData.userEmail, loginData.userPassword);
     
    

    await page.getByRole('button', { name: ' Add To Cart' }).first().click();
    await page.getByRole('button', { name: ' Add To Cart' }).nth(1).click();
    await page.getByRole('button', { name: ' Add To Cart' }).nth(2).click();
   await page.locator("[routerlink*='cart']").click();
    //await page.pause();
    
    await page.locator("div li").first().waitFor();
    const bool =await page.locator("h3:has-text('Zara Coat 3')").isVisible();
    expect(bool).toBeTruthy();
    const cartPage = poManager.getCartPage()

    await cartPage.Checkout()

    
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(loginData.userEmail);
   await page.locator(".action__submit").click();

   const orderRev = poManager.getOrdersReviewPage()

   await orderRev.searchCountryAndSelect("ind","India")

   const orderHistory= poManager.getOrdersHistoryPage()

   await page.locator("body > app-root > app-order > section > div > div > div.col-md-7 > div > div > div.payment__info > div.payment__shipping > div.details__user > div > div.actions > a").click()

   await orderHistory.expectThanks()

   await orderHistory.searchOrderAndSelect()
   
   await orderHistory.expectOrderId()


    

 });
 

 



 

