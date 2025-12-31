 const {test, expect} = require('@playwright/test');
 const { LoginPage } = require('../tests/Page/LoginPage');
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
    await page.locator("text=Checkout").click();
   await page.locator("//input[@placeholder='Select Country']").pressSequentially("ind", { delay: 150 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i =0;i< optionsCount; ++i)
    {
        const text =  await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
           await dropdown.locator("button").nth(i).click();
           break;
        }
    }
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(loginData.userEmail);
   await page.locator(".action__submit").click();
   
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator("//tr[@class='ng-star-inserted']//td[@class='em-spacer-1']").textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
 const rows = await page.locator("tbody tr");


 for(let i =0; i<await rows.count(); ++i)
 {
    const rowOrderId =await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId))
    {
        await rows.nth(i).locator("button").first().click();
        break;
    }
 }
 const orderIdDetails =await page.locator(".col-text").textContent();
 expect(orderId.includes(orderIdDetails)).toBeTruthy();


    

 });
 

 



 

