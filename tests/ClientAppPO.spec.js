 const {test, expect} = require('@playwright/test');
 const { LoginPage } = require('../tests/Page/LoginPage');
 const loginData = require('../loginData.json');

 test('Client App login', async ({page})=>
 {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(loginData.userEmail, loginData.userPassword);
     
    const productName = 'Zara Coat 4';
    const products = page.locator(".card-body");
    

 });
 

 



 

