import { Selector } from 'testcafe';

class EditLostItemsPage {
  constructor() {
    this.pageId = '#edit-lost-items-page';
    this.pageSelector = Selector(this.pageId);
    this.firstRowEditLink = Selector('td').withText('Edit').nth(0).find('a');
  }

  /** Assert that the Item List (Admin) page has an 'Edit' link in the first row */
  async hasEdit(testController) {
    await testController
      .expect(this.firstRowEditLink.exists).ok('The first row edit link should exist')
      .click(this.firstRowEditLink);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok('The Edit Lost item page should exist');
  }
}

export const editLostItemsPage = new EditLostItemsPage();
