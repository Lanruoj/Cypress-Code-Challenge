// import { expect } from "chai";
// import { beforeEach } from "mocha";
import { LoginPage } from "./pages/LoginPage";
import { ProductPage } from "./pages/ProductsPage";

const loginPage = new LoginPage();
const productPage = new ProductPage();

describe("Validate login functionality", () => {
  beforeEach(() => {
    cy.visit("");
    loginPage.loginFormExists();
  });

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
