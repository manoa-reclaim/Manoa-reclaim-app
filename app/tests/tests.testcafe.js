import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { searchLostItemPage } from './searchlostitem.page';
import { registerLostItemsPage } from './regiserlostitems.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the Search Lost Item page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSearchLostItemPage(testController);
  // Check if the Search Lost Item page is displayed
  await searchLostItemPage.isDisplayed(testController);
  // Check for the presence of description and file input fields
  await searchLostItemPage.isDescriptionTextAreaDisplayed(testController);
  await searchLostItemPage.isFileInputDisplayed(testController);
  // Type in the description and upload an example photo
  await searchLostItemPage.typeDescription(testController, 'A detailed description of the lost item.');
  await searchLostItemPage.uploadFile(testController, '../public/images/wallet-example.jpg');
});

test('Test the Register Lost Items page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoRegisterLostItems(testController);
  // Check if the Register Lost Item page is displayed
  await registerLostItemsPage.isDisplayed(testController);
  //  Check if elements exist and input the form data
  await registerLostItemsPage.isNameInputDisplayedAndType(testController, 'Wallet');
  await registerLostItemsPage.isDateInputDisplayedAndType(testController, '04/22/2024');
  await registerLostItemsPage.isEmailInputDisplayedAndType(testController, 'john@foo.com');
  await registerLostItemsPage.isDescriptionInputDisplayedAndType(testController, 'brown, leather has ID of John.');
  await registerLostItemsPage.isLocationSelectDisplayedAndSelect(testController, 'POST');

  // Submit the form
  await registerLostItemsPage.hasSubmitForm(testController);
});
