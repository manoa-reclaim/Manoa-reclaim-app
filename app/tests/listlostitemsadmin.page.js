import { Selector } from 'testcafe';

class ListLostItemsAdminPage {
  constructor() {
    this.pageId = '#list-lost-items-admin-page';
    this.pageSelector = Selector(this.pageId);
    this.deleteButton = Selector('button').withExactText('Delete Item');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok('The Item List (Admin) page should exist');
  }

  /** Asserts that at least one 'Delete Item' button exists on the page. */
  async hasDeleteButton(testController) {
    await testController.expect(this.deleteButton.exists).ok('The delete item button should exist on the page');
  }
}

export const listLostItemsAdminPage = new ListLostItemsAdminPage();
