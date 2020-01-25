import { element, by, ElementFinder } from 'protractor';

export default class OrderUpdatePage {
  pageTitle: ElementFinder = element(by.id('threedshopApp.order.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  totalPriceInput: ElementFinder = element(by.css('input#order-totalPrice'));
  orderDateInput: ElementFinder = element(by.css('input#order-orderDate'));
  statusInput: ElementFinder = element(by.css('input#order-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTotalPriceInput(totalPrice) {
    await this.totalPriceInput.sendKeys(totalPrice);
  }

  async getTotalPriceInput() {
    return this.totalPriceInput.getAttribute('value');
  }

  async setOrderDateInput(orderDate) {
    await this.orderDateInput.sendKeys(orderDate);
  }

  async getOrderDateInput() {
    return this.orderDateInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
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
