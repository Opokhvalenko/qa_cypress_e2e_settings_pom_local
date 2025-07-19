// cypress/support/pages/SettingsPage.js
import PageObject from '../PageObject'; // Імпортуємо базовий PageObject

class SettingsPage extends PageObject {
  get imageInput() {
    return cy.getByDataCy('settings-image-input');
  }

  get usernameInput() {
    return cy.getByDataCy('settings-username-input');
  }

  get bioTextarea() {
    return cy.getByDataCy('settings-bio-textarea');
  }

  get emailInput() {
    return cy.getByDataCy('settings-email-input');
  }

  get passwordInput() {
    return cy.getByDataCy('settings-password-input');
  }

  get updateSettingsButton() {
    return cy.getByDataCy('update-settings-button');
  }

  // Методи для взаємодії зі сторінкою
  visit() {
    cy.visit('/settings'); // Шлях до сторінки налаштувань
  }

  typeImage(url) {
    this.imageInput.clear().type(url);
  }

  typeUsername(username) {
    this.usernameInput.clear().type(username);
  }

  typeBio(bio) {
    this.bioTextarea.clear().type(bio);
  }

  typeEmail(email) {
    this.emailInput.clear().type(email);
  }

  typePassword(password) {
    this.passwordInput.clear().type(password);
  }

  clickUpdateSettings() {
    this.updateSettingsButton.click();
  }

  // Додаткові методи для перевірок (асертів)
  assertUsernameIs(username) {
    this.usernameInput.should('have.value', username);
  }

  assertBioIs(bio) {
    this.bioTextarea.should('have.value', bio);
  }

  assertEmailIs(email) {
    this.emailInput.should('have.value', email);
  }

  assertPasswordIsEmpty() {
    this.passwordInput.should('have.value', '');
  }
}

export default SettingsPage;
