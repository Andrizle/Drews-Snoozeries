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
        price: 213,
      },
      {
        ownerId: 2,
        address: '1234 main st',
        city: 'Oakland',
        state: 'CA',
        country: 'USA',
        lat: 23.344,
        lng: 123.345,
        name: 'super duper',
        description: 'place where you can super relax',
        price: 312,
      },
      {
        ownerId: 3,
        address: '1234 main st',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 28.354,
        lng: 128.355,
        name: 'super duper',
        description: 'place where you can super relax',
        price: 395,
      },
      {
        ownerId: 4,
        address: '5460 Country Club Pkwy',
        city: 'San Jose',
        state: 'CA',
        country: 'USA',
        lat: 37.2756755,
        lng: -121.7714123,
        name: 'The Estate',
        description: 'Private resort with full-sized golf course and driving range',
        price: 1023,
      },
      {
        ownerId: 5,
        address: '1234 main st',
        city: 'Sacramento',
        state: 'CA',
        country: 'USA',
        lat: 22.334,
        lng: 178.335,
        name: 'super duper',
        description: 'place where you can super relax',
        price: 425,
      },
      {
        ownerId: 6,
        address: '500 S Alameda St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.0394369,
        lng: -118.2393711,
        name: 'Skid Mansion',
        description: 'Need somewhere cheap to visit LA? I gotchu!',
        price: 53,
      },
      {
        ownerId: 7,
        address: '985 Riverfront St',
        city: 'West Sacramento',
        state: 'CA',
        country: 'USA',
        lat: 38.5761872,
        lng: -121.5149100,
        name: 'The Barn',
        description: 'Grab a beer and kick your feet up',
        price: 423,
      },
      {
        ownerId: 8,
        address: '43-425 Hale Hookipa Pl',
        city: 'Paauilo',
        state: 'HI',
        country: 'USA',
        lat: 20.0420863,
        lng: -155.3689959,
        name: 'Paradise',
        description: 'One of the most relaxing stays you\'ll have on the outskirts of the Big Island',
        price: 223,
      },
      {
        ownerId: 9,
        address: '3387 Aloha Rd',
        city: 'South Lake Tahoe',
        state: 'CA',
        country: 'USA',
        lat: 38.933360,
        lng: -119.958297,
        name: 'Cali Paradise',
        description: 'Perfect for a quick local vacation',
        price: 323,
      },
      {
        ownerId: 10,
        address: '3200 Pinto Dr',
        city: 'Kissimmee',
        state: 'FL',
        country: 'USA',
        lat: 28.344415,
        lng: -81.493061,
        name: 'Disney Awaits',
        description: 'Very close to Disney World, Nice luscious park right next door, and Walmart down the street for all your shopping needs during your stay here',
        price: 523,
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
