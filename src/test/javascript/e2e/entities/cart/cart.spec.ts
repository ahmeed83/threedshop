import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CartComponentsPage, { CartDeleteDialog } from './cart.page-object';
import CartUpdatePage from './cart-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Cart e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cartComponentsPage: CartComponentsPage;
  let cartUpdatePage: CartUpdatePage;
  let cartDeleteDialog: CartDeleteDialog;

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

  it('should load Carts', async () => {
    await navBarPage.getEntityPage('cart');
    cartComponentsPage = new CartComponentsPage();
    expect(await cartComponentsPage.getTitle().getText()).to.match(/Carts/);
  });

  it('should load create Cart page', async () => {
    await cartComponentsPage.clickOnCreateButton();
    cartUpdatePage = new CartUpdatePage();
    expect(await cartUpdatePage.getPageTitle().getAttribute('id')).to.match(/threedshopApp.cart.home.createOrEditLabel/);
    await cartUpdatePage.cancel();
  });

  it('should create and save Carts', async () => {
    async function createCart() {
      await cartComponentsPage.clickOnCreateButton();
      await cartUpdatePage.setCartTotalInput('5');
      expect(await cartUpdatePage.getCartTotalInput()).to.eq('5');
      await waitUntilDisplayed(cartUpdatePage.getSaveButton());
      await cartUpdatePage.save();
      await waitUntilHidden(cartUpdatePage.getSaveButton());
      expect(await cartUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createCart();
    await cartComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await cartComponentsPage.countDeleteButtons();
    await createCart();
    await cartComponentsPage.waitUntilLoaded();

    await cartComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await cartComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Cart', async () => {
    await cartComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await cartComponentsPage.countDeleteButtons();
    await cartComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    cartDeleteDialog = new CartDeleteDialog();
    expect(await cartDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/threedshopApp.cart.delete.question/);
    await cartDeleteDialog.clickOnConfirmButton();

    await cartComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await cartComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
