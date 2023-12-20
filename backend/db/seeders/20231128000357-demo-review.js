'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: 'This place is pretty terrible',
        stars: 1,
      },
      {
        spotId: 1,
        userId: 3,
        review: 'This place was alright',
        stars: 4,
      },
      {
        spotId: 1,
        userId: 4,
        review: 'This spot is absolutely awesome 6/5 stars!',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 3,
        review: 'This place is pretty terrible',
        stars: 1,
      },
      {
        spotId: 2,
        userId: 4,
        review: 'This place was alright',
        stars: 2,
      },
      {
        spotId: 2,
        userId: 5,
        review: 'This spot is absolutely awesome 6/5 stars!',
        stars: 5,
      },
      {
        spotId: 3,
        userId: 4,
        review: 'This place is pretty terrible',
        stars: 1,
      },
      {
        spotId: 3,
        userId: 5,
        review: 'This place was alright',
        stars: 3,
      },
      {
        spotId: 3,
        userId: 6,
        review: 'This spot is absolutely awesome 6/5 stars!',
        stars: 5,
      },
      {
        spotId: 4,
        userId: 5,
        review: 'This place is pretty terrible',
        stars: 1,
      },
      {
        spotId: 4,
        userId: 6,
        review: 'This place was alright',
        stars: 3,
      },
      {
        spotId: 4,
        userId: 7,
        review: 'This spot is absolutely awesome 6/5 stars!',
        stars: 5,
      },
      {
        spotId: 5,
        userId: 6,
        review: 'This place is pretty terrible',
        stars: 1,
      },
      {
        spotId: 5,
        userId: 7,
        review: 'This place was alright',
        stars: 3,
      },
      {
        spotId: 5,
        userId: 8,
        review: 'This spot is absolutely awesome 6/5 stars!',
        stars: 5,
      },
      {
        spotId: 6,
        userId: 7,
        review: 'This place is pretty terrible',
        stars: 1,
      },
      {
        spotId: 6,
        userId: 8,
        review: 'This place was alright',
        stars: 3,
      },
      {
        spotId: 6,
        userId: 9,
        review: 'This spot is absolutely awesome 6/5 stars!',
        stars: 5,
      },
      {
        spotId: 7,
        userId: 8,
        review: 'This place is pretty terrible',
        stars: 1,
      },
      {
        spotId: 7,
        userId: 9,
        review: 'This place was alright',
        stars: 3,
      },
      {
        spotId: 7,
        userId: 10,
        review: 'This spot is absolutely awesome 6/5 stars!',
        stars: 5,
      },
      {
        spotId: 8,
        userId: 9,
        review: 'This place is pretty terrible',
        stars: 1,
      },
      {
        spotId: 8,
        userId: 10,
        review: 'This place was alright',
        stars: 3,
      },
      {
        spotId: 8,
        userId: 1,
        review: 'This spot is absolutely awesome 6/5 stars!',
        stars: 5,
      },
      {
        spotId: 9,
        userId: 10,
        review: 'This place is pretty terrible',
        stars: 1,
      },
      {
        spotId: 9,
        userId: 1,
        review: 'This place was alright',
        stars: 3,
      },
      {
        spotId: 9,
        userId: 2,
        review: 'This spot is absolutely awesome 6/5 stars!',
        stars: 5,
      },
      {
        spotId: 10,
        userId: 1,
        review: 'This place is pretty terrible',
        stars: 1,
      },
      {
        spotId: 10,
        userId: 2,
        review: 'This place was alright',
        stars: 3,
      },
      {
        spotId: 10,
        userId: 3,
        review: 'This spot is absolutely awesome 6/5 stars!',
        stars: 5,
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
