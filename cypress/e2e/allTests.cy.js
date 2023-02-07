// import { expect } from "chai";
// import { beforeEach } from "mocha";
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
    cy.get(".title").should("be.visible");
  });
});

describe("Validate filtering products low-high", () => {
  beforeEach(() => {
    cy.visit("");
    loginPage.login("standard_user", "secret_sauce");
  });
  it("Selects low-high option", () => {
    productPage.selectLowToHigh();
  });
  it("Verifies low-high filter is applied", () => {
    productPage.checkLoHi();
  });
});
