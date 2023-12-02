'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName: 'Lition',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: 'Billy',
        lastName: 'Bob',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        firstName: 'Emma',
        lastName: 'Jones',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'andz@user.io',
        firstName: 'Andrew',
        lastName: 'Madrigal',
        username: 'Andrizle',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'user5@user.io',
        firstName: 'Darion',
        lastName: 'Johnson',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'prettygirl@user.io',
        firstName: 'Isabella',
        lastName: 'Nixon',
        username: 'princess',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        email: 'audlazna@user.io',
        firstName: 'Jacob',
        lastName: 'Anzaldua',
        username: 'Audlazna',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        email: 'theBwandMan@user.io',
        firstName: 'Bwandon',
        lastName: 'Bwandonson',
        username: 'bwandonator',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        email: '9lives@user.io',
        firstName: 'Tony',
        lastName: 'Bologna',
        username: 'delulu',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        email: 'theGame@user.io',
        firstName: 'Jayceon',
        lastName: 'Taylor',
        username: 'TheGame',
        hashedPassword: bcrypt.hashSync('password10')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'Andrizle', 'bwandonator', 'delulu', 'princess', 'TheGame', 'Audlazna', 'FakeUser5'] }
    }, {});
  }
};
