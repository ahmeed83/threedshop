import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProductComponentsPage, { ProductDeleteDialog } from './product.page-object';
import ProductUpdatePage from './product-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Product e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productComponentsPage: ProductComponentsPage;
  let productUpdatePage: ProductUpdatePage;
  let productDeleteDialog: ProductDeleteDialog;

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

  it('should load Products', async () => {
    await navBarPage.getEntityPage('product');
    productComponentsPage = new ProductComponentsPage();
    expect(await productComponentsPage.getTitle().getText()).to.match(/Products/);
  });

  it('should load create Product page', async () => {
    await productComponentsPage.clickOnCreateButton();
    productUpdatePage = new ProductUpdatePage();
    expect(await productUpdatePage.getPageTitle().getAttribute('id')).to.match(/threedshopApp.product.home.createOrEditLabel/);
    await productUpdatePage.cancel();
  });

  it('should create and save Products', async () => {
    async function createProduct() {
      await productComponentsPage.clickOnCreateButton();
      await productUpdatePage.setNameInput('name');
      expect(await productUpdatePage.getNameInput()).to.match(/name/);
      await productUpdatePage.setDescriptionInput('description');
      expect(await productUpdatePage.getDescriptionInput()).to.match(/description/);
      await productUpdatePage.setQuantityInput('5');
      expect(await productUpdatePage.getQuantityInput()).to.eq('5');
      await productUpdatePage.setImageInput('image');
      expect(await productUpdatePage.getImageInput()).to.match(/image/);
      await productUpdatePage.setPriceInput('5');
      expect(await productUpdatePage.getPriceInput()).to.eq('5');
      await productUpdatePage.setLastUpdateInput('01-01-2001');
      expect(await productUpdatePage.getLastUpdateInput()).to.eq('2001-01-01');
      await productUpdatePage.categorySelectLastOption();
      await waitUntilDisplayed(productUpdatePage.getSaveButton());
      await productUpdatePage.save();
      await waitUntilHidden(productUpdatePage.getSaveButton());
      expect(await productUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createProduct();
    await productComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await productComponentsPage.countDeleteButtons();
    await createProduct();
    await productComponentsPage.waitUntilLoaded();

    await productComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await productComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Product', async () => {
    await productComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await productComponentsPage.countDeleteButtons();
    await productComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    productDeleteDialog = new ProductDeleteDialog();
    expect(await productDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/threedshopApp.product.delete.question/);
    await productDeleteDialog.clickOnConfirmButton();

    await productComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await productComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
