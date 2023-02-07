import { LoginPage } from "./pages/LoginPage";
import { ProductPage } from "./pages/ProductsPage";

const loginPage = new LoginPage();
const productPage = new ProductPage();

describe("Validate login functionality", () => {
  it("Login page loads", () => {
    // Extends from baseUrl in config file
    cy.visit("");
  });

  it("Successfully logs in standard_user", () => {
    cy.visit("");
    loginPage.login("standard_user", "secret_sauce");
    cy.get(".title");
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
});
