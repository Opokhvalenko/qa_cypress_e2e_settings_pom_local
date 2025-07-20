import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  // ЗМІНЕНО: тепер це МЕТОД, тому додано дужки ()
  usernameLink() { 
    return cy.getByDataCy('profile-link');
  }

  assertHeaderContainUsername(username) {
    // Тепер це коректний виклик методу
    this.usernameLink().should('be.visible', { timeout: 10000 })
    .and('contain', username);
  }
}

export default HomePageObject;
