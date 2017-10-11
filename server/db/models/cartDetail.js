'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const CartDetail = db.define('CartDetail', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
});

module.exports = CartDetail;
