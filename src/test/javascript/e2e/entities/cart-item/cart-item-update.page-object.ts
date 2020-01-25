import { element, by, ElementFinder } from 'protractor';

export default class CartItemUpdatePage {
  pageTitle: ElementFinder = element(by.id('threedshopApp.cartItem.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quantityInput: ElementFinder = element(by.css('input#cart-item-quantity'));
  priceInput: ElementFinder = element(by.css('input#cart-item-price'));
  productSelect: ElementFinder = element(by.css('select#cart-item-product'));
  cartSelect: ElementFinder = element(by.css('select#cart-item-cart'));
  orderSelect: ElementFinder = element(by.css('select#cart-item-order'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return this.quantityInput.getAttribute('value');
  }

  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return this.priceInput.getAttribute('value');
  }

  async productSelectLastOption() {
    await this.productSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productSelectOption(option) {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect() {
    return this.productSelect;
  }

  async getProductSelectedOption() {
    return this.productSelect.element(by.css('option:checked')).getText();
  }

  async cartSelectLastOption() {
    await this.cartSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cartSelectOption(option) {
    await this.cartSelect.sendKeys(option);
  }

  getCartSelect() {
    return this.cartSelect;
  }

  async getCartSelectedOption() {
    return this.cartSelect.element(by.css('option:checked')).getText();
  }

  async orderSelectLastOption() {
    await this.orderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async orderSelectOption(option) {
    await this.orderSelect.sendKeys(option);
  }

  getOrderSelect() {
    return this.orderSelect;
  }

  async getOrderSelectedOption() {
    return this.orderSelect.element(by.css('option:checked')).getText();
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
