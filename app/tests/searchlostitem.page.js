import { Selector } from 'testcafe';

class SearchLostItemPage {
  constructor() {
    this.pageId = '#search-lost-item-page';
    this.pageSelector = Selector(this.pageId);
    this.descriptionTextArea = Selector('textarea#description');
    this.fileInput = Selector('input[type="file"]');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that the description text area is displayed. */
  async isDescriptionTextAreaDisplayed(testController) {
    await testController.expect(this.descriptionTextArea.exists).ok('The description text area should be visible.', { timeout: 5000 });
  }

  /** Asserts that the file input is displayed. */
  async isFileInputDisplayed(testController) {
    await testController.expect(this.fileInput.exists).ok('The file input should be visible.', { timeout: 5000 });
  }

  /** Asserts that the description text area accepts test input */
  async typeDescription(testController, text) {
    await testController.typeText(this.descriptionTextArea, text);
  }

  /** Asserts that a file can be uploaded */
  async uploadFile(testController, filePath) {
    await testController.setFilesToUpload(this.fileInput, filePath);
  }
}

export const searchLostItemPage = new SearchLostItemPage();
