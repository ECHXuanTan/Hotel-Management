'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456', // plain text password -> hash password
      firstName: 'Tri',
      lastName: 'Le',
      address: 'HCM',
      gender: 1,
      roleId: 'R1',
      phoneNumber: '0379059743',
      positionId: 'Admin',
      image : '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
