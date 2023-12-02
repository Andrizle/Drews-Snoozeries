'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-12-23',
        endDate: '2024-01-01',
      },
      {
        spotId: 1,
        userId: 3,
        startDate: '2024-01-02',
        endDate: '2024-01-05',
      },
      {
        spotId: 1,
        userId: 4,
        startDate: '2024-03-02',
        endDate: '2024-03-05',
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2023-12-23',
        endDate: '2024-01-01',
      },
      {
        spotId: 2,
        userId: 4,
        startDate: '2024-01-02',
        endDate: '2024-01-05',
      },
      {
        spotId: 2,
        userId: 5,
        startDate: '2024-03-02',
        endDate: '2024-03-05',
      },
      {
        spotId: 3,
        userId: 4,
        startDate: '2023-12-23',
        endDate: '2024-01-01',
      },
      {
        spotId: 3,
        userId: 5,
        startDate: '2024-01-02',
        endDate: '2024-01-05',
      },
      {
        spotId: 3,
        userId: 5,
        startDate: '2024-03-02',
        endDate: '2024-03-05',
      },
      {
        spotId: 4,
        userId: 5,
        startDate: '2023-12-23',
        endDate: '2024-01-01',
      },
      {
        spotId: 4,
        userId: 6,
        startDate: '2024-01-02',
        endDate: '2024-01-05',
      },
      {
        spotId: 4,
        userId: 7,
        startDate: '2024-03-02',
        endDate: '2024-03-05',
      },
      {
        spotId: 5,
        userId: 6,
        startDate: '2023-12-23',
        endDate: '2024-01-01',
      },
      {
        spotId: 5,
        userId: 7,
        startDate: '2024-01-02',
        endDate: '2024-01-05',
      },
      {
        spotId: 5,
        userId: 8,
        startDate: '2024-03-02',
        endDate: '2024-03-05',
      },
      {
        spotId: 6,
        userId: 7,
        startDate: '2023-12-23',
        endDate: '2024-01-01',
      },
      {
        spotId: 6,
        userId: 8,
        startDate: '2024-01-02',
        endDate: '2024-01-05',
      },
      {
        spotId: 6,
        userId: 9,
        startDate: '2024-03-02',
        endDate: '2024-03-05',
      },
      {
        spotId: 7,
        userId: 8,
        startDate: '2023-12-23',
        endDate: '2024-01-01',
      },
      {
        spotId: 7,
        userId: 9,
        startDate: '2024-01-02',
        endDate: '2024-01-05',
      },
      {
        spotId: 7,
        userId: 10,
        startDate: '2024-03-02',
        endDate: '2024-03-05',
      },
      {
        spotId: 8,
        userId: 9,
        startDate: '2023-12-23',
        endDate: '2024-01-01',
      },
      {
        spotId: 8,
        userId: 10,
        startDate: '2024-01-02',
        endDate: '2024-01-05',
      },
      {
        spotId: 8,
        userId: 1,
        startDate: '2024-03-02',
        endDate: '2024-03-05',
      },
      {
        spotId: 9,
        userId: 10,
        startDate: '2023-12-23',
        endDate: '2024-01-01',
      },
      {
        spotId: 9,
        userId: 1,
        startDate: '2024-01-02',
        endDate: '2024-01-05',
      },
      {
        spotId: 9,
        userId: 2,
        startDate: '2024-03-02',
        endDate: '2024-03-05',
      },
      {
        spotId: 10,
        userId: 1,
        startDate: '2023-12-23',
        endDate: '2024-01-01',
      },
      {
        spotId: 10,
        userId: 2,
        startDate: '2024-01-02',
        endDate: '2024-01-05',
      },
      {
        spotId: 10,
        userId: 3,
        startDate: '2024-03-02',
        endDate: '2024-03-05',
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
