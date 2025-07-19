/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPage from '../support/pages/SettingsPage';
import HomePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

const settingsPage = new SettingsPage();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password); // Реєструємо користувача
      cy.login(user.email, user.password);
      settingsPage.visit(); // Переходимо на сторінку налаштувань
    });
  });

  it('should provide an ability to update username', () => {
    // Генеруємо newUsername тут, щоб він був унікальним для кожного запуску тесту
    const newUsername = faker.internet.userName().toLowerCase()
     + Cypress._.random(0, 1e6); 
    // Додаємо унікальний суфікс

    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateSettings();

    cy.url().should('include', `/profile/${newUsername}`);
    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();

    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateSettings();

    cy.url().should('include', `/profile/${user.username}`);
    settingsPage.visit();
    cy.get('[data-cy^="settings-bio-input"]').should('have.value', newBio);
    settingsPage.assertBioIs(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email().toLowerCase();

    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateSettings();

    cy.url().should('include', `/profile/${user.username}`);
    settingsPage.visit();
    cy.get('[data-cy^="settings-email-input"]').should('have.value', newEmail);
    settingsPage.assertEmailIs(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password({
      length: 12, upper: true, lower: true, numeric: true, symbols: true 
    });
    
    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateSettings();

    cy.url().should('include', `/profile/${user.username}`);

    cy.login(user.email, newPassword); 
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    Page.usernameLink.should('not.exist'); 
      cy.get('[data-cy="logout-button"]').click();
      cy.url().should('not.include', '/settings');
      cy.url().should('include', '/');
      cy.contains('Sign in').should('be.visible');
      homePage.usernameLink.should('not.exist');
  });
});
