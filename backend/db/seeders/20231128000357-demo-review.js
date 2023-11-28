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
        review: "Oh brother, this place stinks",
        stars: 1
      },
      {
        spotId: 1,
        userId: 3,
        review: "Oh brother, this place... is actually pretty nice. Very quite little place.",
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: "Couldn't have asked for a better stay, this mansion is YUGE",
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: "Oh brother, this place also stinks",
        stars: 1
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
