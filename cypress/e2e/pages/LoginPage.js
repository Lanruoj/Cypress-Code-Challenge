export class LoginPage {
  usernameInput = '[data-test="username"]';
  passwordInput = '[data-test="password"]';
  loginButton = '[data-test="login-button"]';
  loginForm = "#login_button_container";

  loginFormExists() {
    cy.get(this.loginForm).should("be.visible");
  }

  enterUsername(username) {
    cy.get(this.usernameInput).type(username);
  }

  enterPassword(password) {
    cy.get(this.passwordInput).type(password);
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }
}
