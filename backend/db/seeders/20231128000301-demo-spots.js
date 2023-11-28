'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '1234 main st',
        city: 'San Jose',
        state: 'CA',
        country: 'USA',
        lat: 12.334,
        lng: 12.335,
        name: 'super duper',
        description: 'place where you can super relax',
        price: 123,
      },
      {
        ownerId: 2,
        address: '1234 main st',
        city: 'Oakland',
        state: 'CA',
        country: 'USA',
        lat: 123.344,
        lng: 123.345,
        name: 'super duper',
        description: 'place where you can super relax',
        price: 123,
      },
      {
        ownerId: 3,
        address: '1234 main st',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 128.354,
        lng: 128.355,
        name: 'super duper',
        description: 'place where you can super relax',
        price: 123,
      },
      {
        ownerId: 2,
        address: '1234 main st',
        city: 'Sacramento',
        state: 'CA',
        country: 'USA',
        lat: 212.334,
        lng: 212.335,
        name: 'super duper',
        description: 'place where you can super relax',
        price: 123,
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
