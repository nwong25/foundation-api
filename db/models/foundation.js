'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Foundation = db.define('foundation', {
  name: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 5
    }
  }
});

module.exports = Foundation;
