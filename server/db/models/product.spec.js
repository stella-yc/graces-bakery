/* global describe beforeEach it */
'use strict';

const { expect } = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('getterMethods', () => {
    describe('get image', () => {
      let curryBun;

      beforeEach(() => {
        return Product.create({
          name: 'Curry Bun',
          description: 'A spicy fried bun... yum!',
          price: '2.50',
          image: 'currybun.jpg'
        })
          .then(product => {
            curryBun = product;
          });
      });

      it('returns the path to the image', () => {
        expect(curryBun.image).to.be.equal('/img/currybun.jpg');
      });

    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
}); // end describe('Product model')
