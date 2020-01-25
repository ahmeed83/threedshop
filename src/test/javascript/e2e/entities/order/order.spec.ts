import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OrderComponentsPage, { OrderDeleteDialog } from './order.page-object';
import OrderUpdatePage from './order-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Order e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let orderComponentsPage: OrderComponentsPage;
  let orderUpdatePage: OrderUpdatePage;
  let orderDeleteDialog: OrderDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Orders', async () => {
    await navBarPage.getEntityPage('order');
    orderComponentsPage = new OrderComponentsPage();
    expect(await orderComponentsPage.getTitle().getText()).to.match(/Orders/);
  });

  it('should load create Order page', async () => {
    await orderComponentsPage.clickOnCreateButton();
    orderUpdatePage = new OrderUpdatePage();
    expect(await orderUpdatePage.getPageTitle().getAttribute('id')).to.match(/threedshopApp.order.home.createOrEditLabel/);
    await orderUpdatePage.cancel();
  });

  it('should create and save Orders', async () => {
    async function createOrder() {
      await orderComponentsPage.clickOnCreateButton();
      await orderUpdatePage.setTotalPriceInput('5');
      expect(await orderUpdatePage.getTotalPriceInput()).to.eq('5');
      await orderUpdatePage.setOrderDateInput('01-01-2001');
      expect(await orderUpdatePage.getOrderDateInput()).to.eq('2001-01-01');
      await orderUpdatePage.setStatusInput('status');
      expect(await orderUpdatePage.getStatusInput()).to.match(/status/);
      await waitUntilDisplayed(orderUpdatePage.getSaveButton());
      await orderUpdatePage.save();
      await waitUntilHidden(orderUpdatePage.getSaveButton());
      expect(await orderUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createOrder();
    await orderComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await orderComponentsPage.countDeleteButtons();
    await createOrder();
    await orderComponentsPage.waitUntilLoaded();

    await orderComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await orderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Order', async () => {
    await orderComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await orderComponentsPage.countDeleteButtons();
    await orderComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    orderDeleteDialog = new OrderDeleteDialog();
    expect(await orderDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/threedshopApp.order.delete.question/);
    await orderDeleteDialog.clickOnConfirmButton();

    await orderComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await orderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
