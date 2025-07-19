/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPage from '../support/pages/SettingsPage';
import HomePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

const settingsPage = new SettingsPage();
const homePage = new HomePageObject();
// Прибираємо const newUsername = faker.internet.userName().toLowerCase(); звідси

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password); // Реєструємо користувача
      cy.login(user.email, user.password); // <-- Правильний логін з початковим паролем
      settingsPage.visit(); // Переходимо на сторінку налаштувань
    });
  });

  it('should provide an ability to update username', () => {
    // Генеруємо newUsername тут, щоб він був унікальним для кожного запуску тесту
    const newUsername = faker.internet.userName().
    toLowerCase() + Cypress._.random(0, 1e6); 
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
    settingsPage.visit(); // Повертаємося, щоб перевірити відображення
    settingsPage.assertBioIs(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email().toLowerCase();

    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateSettings();

    cy.url().should('include', `/profile/${user.username}`);
    settingsPage.visit(); // Повертаємося, щоб перевірити відображення
    settingsPage.assertEmailIs(newEmail);
  });

  it('should provide an ability to update password', () => {
    // Пароль генеруємо тут, в самому тесті
    const newPassword = faker.internet.password({
      length: 12, upper: true, lower: true, numeric: true, symbols: true 
    });
    
    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateSettings();

    cy.url().should('include', `/profile/${user.username}`);

    // Тепер логінимося з новим паролем, НЕ очищуючи базу даних
    // Оскільки ми вже зареєстровані та оновили пароль для цього "user"
    cy.login(user.email, newPassword); // <-- Ось тут використовуємо newPassword
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    // Твій код для виходу з системи
    // Наприклад:
    // cy.get('[data-cy="logout-button"]').click(); // Припустимо, що є така кнопка
    // cy.url().should('not.include', '/settings'); // Перевірка, що перейшли з сторінки налаштувань
    // cy.url().should('include', '/'); // Перевірка, що перейшли на домашню сторінку
    // cy.contains('Sign in').should('be.visible'); // Перевірка, що з'явилася кнопка Sign In (або щось, що вказує на розлогінення)
    // homePage.usernameLink.should('not.exist'); // Перевіряємо, що ім'я користувача не відображається в хедері
  });
});
