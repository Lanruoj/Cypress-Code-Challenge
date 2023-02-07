export class LoginPage {
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    loginForm: () => cy.get("#login_button_container"),
    errorMessage: () => cy.get('[data-test="error"]'),
  };

  loginFormExists() {
    this.elements.loginForm().should("be.visible");
  }

  errorMessageExists() {
    this.elements.errorMessage().should("be.visible");
  }

  enterUsername(username) {
    this.elements.usernameInput().type(username);
  }

  enterPassword(password) {
    this.elements.passwordInput().type(password);
  }

  clickLogin() {
    this.elements.loginButton().click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  verifyRoutedToInventory() {
    // Verify routed to /inventory.html
    cy.location().should((loc) => {
      expect(loc.pathname).to.not.eq("");
    });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/inventory.html");
    });
  }
}
