import { LoginPage } from "./pages/LoginPage";

const loginPage = new LoginPage();

describe("Validate login functionality", () => {
  it("Login page loads", () => {
    // Extends from baseUrl in config file
    cy.visit("");
  });

  it("Successfully logs in standard_user", () => {
    cy.visit("");
    loginPage.login("standard_user", "secret_sauce");
  });
});
