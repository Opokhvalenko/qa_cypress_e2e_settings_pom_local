import { defineConfig } from 'cypress';
import { faker } from '@faker-js/faker'; // Переконайся, що faker імпортовано
import { clear } from './dataBase';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          let randomNumber = Math.ceil(Math.random(1000) * 1000);
          // *** ЗМІНЕНО ***
          // Використовуємо faker.string.alpha() для літер, щоб уникнути пробілів та спецсимволів
          // Додаємо randomNumber, щоб зробити юзернейм більш унікальним
          let userName = faker.string.alpha({ 
            length: 8, 
            casing: 'lower' }) + randomNumber; 
          return {
            username: userName, // Використовуємо згенерований userName без додаткового .toLowerCase(), бо faker.string.alpha() вже може це робити
            email: faker.internet.email().toLowerCase(), // Забезпечуємо унікальність та нижній регістр для пошти
            password: faker.internet.password({ 
              length: 12, 
              upper: true, 
              lower: true, 
              numeric: true, 
              symbols: true }), // Генеруємо надійний пароль
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word()
          };
        },
        'db:clear'() {
          clear();
          return null;
        },
      });
    },
  },
});
