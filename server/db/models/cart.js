'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  // cart id created automatically
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

module.exports = Cart;
