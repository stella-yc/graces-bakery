'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'bread.jpg',
    validate: {
      isUrl: true
    },
    get() {
      const imgName = this.getDataValue('image');
      // 'this' allows you to access attributes of the instance
      return `/img/${imgName}`;
    },
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
