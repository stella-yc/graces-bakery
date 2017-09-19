const Sequelize = require('sequelize');
const db = require('../db');
const Category = require('./category');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'https://cdn.tutsplus.com/net/uploads/legacy/958_placeholders/placehold.gif',
    validate: {
      isUrl: true
    },
    get() {
      const imgName = this.getDataValue('image');
      // 'this' allows you to access attributes of the instance
      return `/public/img/${imgName}`;
    },
  }
},
{
  scopes: {
    categories: () => ({
      include: [{
        model: Category
      }]
    })
  }
});

module.exports = Product;
