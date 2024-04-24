import { Selector } from 'testcafe';

class ListLostItemsPage {
  constructor() {
    this.pageId = '#list-lost-items-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok('The Item List page should exist');
  }
}

export const listLostItemsPage = new ListLostItemsPage();
