'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
},
{
  scopes: {
    products: () => ({
      include: [{
        model: db.model('product')
      }]
    })
  }
});

module.exports = Category;
