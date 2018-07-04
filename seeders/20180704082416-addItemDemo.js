'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
   
    */
    return queryInterface.bulkInsert('Items', [{
      itemName: "Geneator",
      preorderAvailablility: "14",
      itemCategory: "Electronic",
      downPayment: 5000000,
      price: 50000000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      itemName: "Laptop AlienWare X17",
      preorderAvailablility: "3",
      itemCategory: "Electronic",
      downPayment: 3000000,
      price: 21000000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
