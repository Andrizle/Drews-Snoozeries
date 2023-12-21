'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://lh3.googleusercontent.com/p/AF1QipNbas_NWvW1jbUPWa31f3qc0D8Wd5A6QYD8QRyj=s680-w680-h510",
        preview: true
      },
      {
        spotId: 6,
        url: "https://live.staticflickr.com/1414/856595888_fef1676db4.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=875&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        preview: true
      },
      {
        spotId: 7,
        url: "https://plus.unsplash.com/premium_photo-1668439991057-7e70186ea56b?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        preview: true
      },
      {
        spotId: 8,
        url: "https://images.unsplash.com/photo-1579737834653-10a16d9be79e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        preview: true
      },
      {
        spotId: 9,
        url: "https://plus.unsplash.com/premium_photo-1686090450791-e0ebe58d3064?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        preview: true
      },
      {
        spotId: 10,
        url: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        preview: true
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
