import { Selector } from 'testcafe';

class RegisterLostItemsPage {
  constructor() {
    this.pageId = '#register-lost-items-page';
    this.pageSelector = Selector(this.pageId);
    this.nameInput = Selector('input[name="name"]');
    this.dateInput = Selector('input[name="date"]');
    this.emailInput = Selector('input[name="email"]');
    this.descriptionInput = Selector('input[name="description"]');
    this.locationSelect = Selector('select[name="location"]');
    this.submitButton = Selector('input[type="submit"][value="Submit"]');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page has name, date, email, description and location input as well as a submit button, and can input a form */
  async isNameInputDisplayedAndType(testController, name) {
    await testController
      .expect(this.nameInput.exists).ok('The name input field should exist')
      .typeText(this.nameInput, name, { paste: true });
  }

  async isDateInputDisplayedAndType(testController, date) {
    await testController
      .expect(this.dateInput.exists).ok('The date input field should exist')
      .typeText(this.dateInput, date, { paste: true });
  }

  async isEmailInputDisplayedAndType(testController, email) {
    await testController
      .expect(this.emailInput.exists).ok('The email input should exist')
      .typeText(this.emailInput, email);
  }

  async isDescriptionInputDisplayedAndType(testController, description) {
    await testController
      .expect(this.descriptionInput.exists).ok('The description should exist')
      .typeText(this.descriptionInput, description);
  }

  async isLocationSelectDisplayedAndSelect(testController, location) {
    await testController
      .expect(this.locationSelect.exists).ok('The location should exist')
      .click(this.locationSelect).click(Selector('option', { text: location }));
  }

  async hasSubmitForm(testController) {
    await testController
      .expect(this.submitButton.exists).ok('The submit button should exist')
      .click(this.submitButton);
  }
}

export const registerLostItemsPage = new RegisterLostItemsPage();