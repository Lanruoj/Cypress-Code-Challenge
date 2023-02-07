// import { expect } from "chai";
// import { beforeEach } from "mocha";
// import { it } from "mocha";
import { LoginPage } from "./pages/LoginPage";
import { ProductPage } from "./pages/ProductsPage";

const loginPage = new LoginPage();
const productPage = new ProductPage();

describe("Validate login functionality", () => {
  // Visit page and verify login form loads before each test
  beforeEach(() => {
    cy.visit("");
    loginPage.loginFormExists();
  });
  // Attempt login with invalid username
  it("Unsuccessfully logs in with invalid username", () => {
    loginPage.login("invalid_user", "secret_sauce");
    loginPage.errorMessageExists();
  });
  // Attempt login with invalid password
  it("Unsuccessfully logs in with invalid password", () => {
    loginPage.login("standard_user", "wrong_password");
    loginPage.errorMessageExists();
  });
  // Login with valid user
  it("Successfully logs in standard_user", () => {
    loginPage.login("standard_user", "secret_sauce");
    loginPage.verifyLogin();
  });
});

describe("Validate price filtering", () => {
  beforeEach(() => {
    cy.visit("");
    loginPage.login("standard_user", "secret_sauce");
  });
  it("Filters products by price from low-high", () => {
    productPage.selectLowToHigh();
    productPage.checkPriceOrder("lohi");
  });
  it("Filters products by price from high-low", () => {
    productPage.selectHighToLow();
    productPage.checkPriceOrder("hilo");
  });
});

describe("Validate 'add to cart' functionality", () => {
  beforeEach(() => {
    cy.visit("");
    loginPage.login("standard_user", "secret_sauce");
  });
  it("Add to cart button changes to Remove button", () => {
    productPage.addToCart();
    productPage.verifyRemoveButtonAppears();
  });
  it("'Sauce Labs Backpack' adds to cart", () => {
    productPage.verifyProductAddedToCart();
  });
});
