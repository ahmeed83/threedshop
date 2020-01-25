import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CartItemComponentsPage, { CartItemDeleteDialog } from './cart-item.page-object';
import CartItemUpdatePage from './cart-item-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('CartItem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cartItemComponentsPage: CartItemComponentsPage;
  let cartItemUpdatePage: CartItemUpdatePage;
  let cartItemDeleteDialog: CartItemDeleteDialog;

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

  it('should load CartItems', async () => {
    await navBarPage.getEntityPage('cart-item');
    cartItemComponentsPage = new CartItemComponentsPage();
    expect(await cartItemComponentsPage.getTitle().getText()).to.match(/Cart Items/);
  });

  it('should load create CartItem page', async () => {
    await cartItemComponentsPage.clickOnCreateButton();
    cartItemUpdatePage = new CartItemUpdatePage();
    expect(await cartItemUpdatePage.getPageTitle().getAttribute('id')).to.match(/threedshopApp.cartItem.home.createOrEditLabel/);
    await cartItemUpdatePage.cancel();
  });

  it('should create and save CartItems', async () => {
    async function createCartItem() {
      await cartItemComponentsPage.clickOnCreateButton();
      await cartItemUpdatePage.setQuantityInput('5');
      expect(await cartItemUpdatePage.getQuantityInput()).to.eq('5');
      await cartItemUpdatePage.setPriceInput('5');
      expect(await cartItemUpdatePage.getPriceInput()).to.eq('5');
      await cartItemUpdatePage.productSelectLastOption();
      await cartItemUpdatePage.cartSelectLastOption();
      await cartItemUpdatePage.orderSelectLastOption();
      await waitUntilDisplayed(cartItemUpdatePage.getSaveButton());
      await cartItemUpdatePage.save();
      await waitUntilHidden(cartItemUpdatePage.getSaveButton());
      expect(await cartItemUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createCartItem();
    await cartItemComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await cartItemComponentsPage.countDeleteButtons();
    await createCartItem();
    await cartItemComponentsPage.waitUntilLoaded();

    await cartItemComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await cartItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last CartItem', async () => {
    await cartItemComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await cartItemComponentsPage.countDeleteButtons();
    await cartItemComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    cartItemDeleteDialog = new CartItemDeleteDialog();
    expect(await cartItemDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/threedshopApp.cartItem.delete.question/);
    await cartItemDeleteDialog.clickOnConfirmButton();

    await cartItemComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await cartItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
