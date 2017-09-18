'use strict';

const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./product');

const Category = db.define('categories', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
}, {
  scopes: {
    products: () => ({
      include: [{
        model: Product
      }]
    })
  }
});

module.exports = Category;
