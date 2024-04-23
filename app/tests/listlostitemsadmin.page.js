import { Selector } from 'testcafe';

class ListLostItemsAdminPage {
  constructor() {
    this.pageId = '#list-lost-items-admin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok('The Item List (Admin) page should exist');
  }
}

export const listLostItemsAdminPage = new ListLostItemsAdminPage();
