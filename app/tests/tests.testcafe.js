import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { registerLostItemsPage } from './regiserlostitems.page';
import { listLostItemsPage } from './listlostitems.page';
import { listLostItemsAdminPage } from './listlostitemsadmin.page';
import { editLostItemsAdminPage } from './editlostitemsadmin.page';
import { editLostItemsUserPage } from './editlostitemsuser.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };

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

test('Test that Item List page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListLostItems(testController);
  // Check if Item List page is available
  await listLostItemsPage.isDisplayed(testController);
});

test('Test that Edit Lost Item page for the user shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListLostItems(testController);
  // Check if Item List page is available
  await editLostItemsUserPage.hasEdit(testController);
  await editLostItemsUserPage.isDisplayed(testController);
});

test('Test that Item List (Admin) page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, credentials.password);
  await navBar.gotoListLostItemsAdmin(testController);
  // Check if Item List page is available
  await listLostItemsAdminPage.isDisplayed(testController);
  await listLostItemsAdminPage.hasDeleteButton(testController);
});

test('Test that Edit Lost Item (Admin) page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, credentials.password);
  await navBar.gotoListLostItemsAdmin(testController);
  // Check if Item List page is available
  await editLostItemsAdminPage.hasEdit(testController);
  await editLostItemsAdminPage.isDisplayed(testController);
});

test('Test the Register Lost Items page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoRegisterLostItems(testController);
  // Check if the Register Lost Item page is displayed
  await registerLostItemsPage.isDisplayed(testController);
  //  Check if elements exist and input the form data
  await registerLostItemsPage.isNameInputDisplayedAndType(testController, 'Wallet');
  await registerLostItemsPage.isEmailInputDisplayedAndType(testController, 'john@foo.com');
  await registerLostItemsPage.isDescriptionInputDisplayedAndType(testController, 'brown, leather has ID of John.');
  // Submit the form
  await registerLostItemsPage.hasSubmitForm(testController);
});
