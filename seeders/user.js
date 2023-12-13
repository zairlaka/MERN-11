const {v4: uuidV4} = require("uuid");
var {hash} = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const password = await hash('pass1234', 10)
    return queryInterface.bulkInsert('users', [
      {
        userId: uuidV4(),
        firstName: 'Zair',
        lastName: 'admin',
        email: 'admin@gmail.com',
        role: "admin",
        password: await hash('pass1234', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: uuidV4(),
        firstName: 'omar',
        lastName: 'instructor',
        email: 'omar_i@gmail.com',
        role: "instructor",
        password: await hash('pass1234', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: uuidV4(),
        firstName: 'ali',
        lastName: 'trainee',
        email: 'ali_t@gmail.com',
        role: "trainee",
        password: await hash('pass1234', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: uuidV4(),
        firstName: 'moiz',
        lastName: 'tranee',
        email: 'moiz_t@example.com',
        role: "trainee",
        password: await hash('pass1234', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('Users', null, {});
  }
};