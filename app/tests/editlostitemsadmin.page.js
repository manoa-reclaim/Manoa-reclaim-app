import { Selector } from 'testcafe';

class EditlostitemsadminPage {
  constructor() {
    this.pageId = '#edit-lost-items-page';
    this.pageSelector = Selector(this.pageId);
    this.editLink = Selector('ul').find('a').withAttribute('href').withText('Edit Item');
  }

  /** Assert that the Item List (Admin) page has at least one 'Edit' link */
  async hasEdit(testController) {
    await testController
      .expect(this.editLink.exists).ok('The edit link should exist on the page');
  }

  /** Asserts that the edit page is currently displayed. */
  async isDisplayed(testController) {
    await testController
      .click(this.editLink)
      .expect(this.pageSelector.exists).ok('The Edit Lost item page should exist');
  }
}

export const editLostItemsAdminPage = new EditlostitemsadminPage();
