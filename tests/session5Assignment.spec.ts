import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { CartPage } from '../pages/cart.page';
import { CheckOutOnePage } from '../pages/checkOutOne.page';
import { CheckOutTwoPage } from '../pages/checkOutTwo.page';
import { CheckOutCompletePage } from '../pages/checkOutComplete.page';

test ('TC001 - Verify error message appear when login with invalid user', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const userName = 'locked_out_user';
  const password = 'secret_sauce';
  const errorMessage = 'Epic sadface: Sorry, this user has been locked out.';

  await test.step('Step 1: Go to the page', async () => {
    await loginPage.gotoUrl();
  })

  await test.step('Step 2: Input the locked username, password, then click Login Button', async () => {
    await loginPage.InputUsernameAndPassword(userName, password);
    await loginPage.ClickLoginButton();
  })

  await test.step('Step 3: Verify that the error message “Epic sadface: Sorry, this user has been locked out.” is displayed.', async () => {
    await loginPage.VerifyTheErrorMessageIsDisplayed(errorMessage);
  })
})

test ('TC002 - Verify user can order product successfully', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  const checkOutOne = new CheckOutOnePage(page);
  const checkOutTwo = new CheckOutTwoPage(page);
  const checkOutComplete = new CheckOutCompletePage(page);

  const userName = 'standard_user';
  const password = 'secret_sauce';
  const errorMessage = 'Epic sadface: Sorry, this user has been locked out.';

  await test.step('Step 1: Go to the page, enter valid username, password then click Login button', async () => {
    await loginPage.gotoUrl();
    await loginPage.InputUsernameAndPassword(userName,password);
    await loginPage.ClickLoginButton();
  })

  await test.step('Step 2: Verify the HomePage is displayed', async () => {
    await homePage.VerifyThePageTitleIsDisplayed('Products');
  })

  // Initiate the itemName, itemDescription, and itemPrice variables
  var itemName = '';
  var itemDescription = '';
  var itemPrice = ''

  var selectedItem = 2
  await test.step('Step 3: Store the first item name, description, and price', async () => {
    itemName = await homePage.GetItemName(selectedItem);
    itemDescription = await homePage.GetItemDescription(selectedItem);
    itemPrice = await homePage.GetItemPrice(selectedItem);
  })

  await test.step('Step 4: Click Add To Cart button', async () => {
    await homePage.ClickAddToCartButton(selectedItem);
  })

  await test.step('Step 5: Click on the Cart button', async () => {
    await homePage.ClickCartButton();
  })

  await test.step('Step 6: Validate pre-added item is visible', async () => {
    await cartPage.VerifyThePreAddedItemIsVisible(itemName, itemDescription, itemPrice);
    await cartPage.ClickCheckOutButton();
  })

  await test.step('Step 7: Verify the "Checkout: Your Information" page is displayed', async () => {
    await checkOutOne.VerifyThePageTitleIsDisplayed('Checkout: Your Information');
  })

  // Initiate the user information
  const firstName = 'FN';
  const lastName = 'LN';
  const zipCode = '12345';

  await test.step('Step 8: Input all required fields', async () => {
    await checkOutOne.InputAllRequiredFields(firstName, lastName, zipCode);
  })

  await test.step('Step 9: Validate the corresponding fields display input text', async () => {
    await checkOutOne.ValidateTheCorrespondingFieldsDisplayInputText(firstName, lastName, zipCode);
  })

  await test.step('Step 10: Click Continue', async () => {
    await checkOutOne.ClickContinueButton();
  })

  await test.step('Step 11: Verify the "Checkout: Overview" page is displayed', async () => {
    await checkOutTwo.VerifyThePageTitleIsDisplayed('Checkout: Overview');
  })

  await test.step('Step 12: Verify the "Checkout: Overview" page is displayed', async () => {
    await checkOutTwo.ValidateTheCheckOutPageHasItemAddedEarlier(itemName, itemDescription, itemPrice);
  })

  await test.step('Step 13: Click Finish button', async () => {
    await checkOutTwo.ClickFinishButton();
  })

  await test.step('Step 14: validate thank you msg: "Thank you for your order!"  and "Your order has been dispatched, and will arrive just as fast as the pony can get there!"', async () => {
    await checkOutComplete.VerifyThePageTitleIsDisplayed('Checkout: Complete!');
    const thankyouMessage = 'Thank you for your order!';
    const completeMessage = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';
    await checkOutComplete.ValidateTheThankYouMessage(thankyouMessage);
    await checkOutComplete.ValidateTheCompleteMessage(completeMessage);
  })
})