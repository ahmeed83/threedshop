import { element, by, ElementFinder } from 'protractor';

export default class CartUpdatePage {
  pageTitle: ElementFinder = element(by.id('threedshopApp.cart.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  cartTotalInput: ElementFinder = element(by.css('input#cart-cartTotal'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCartTotalInput(cartTotal) {
    await this.cartTotalInput.sendKeys(cartTotal);
  }

  async getCartTotalInput() {
    return this.cartTotalInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
