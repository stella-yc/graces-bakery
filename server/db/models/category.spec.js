/* global describe beforeEach it */
'use strict';

const { expect } = require('chai');
const db = require('../index');
const Category = db.model('category');

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('getterMethods', () => {
    describe('get image', () => {
      let cookieCategory;

      beforeEach(() => {
        return Category.create({
          name: 'cookies',
          displayName: 'Cookies',
          description: 'A tasty treat',
          image: 'cookies.jpg'
        })
          .then(category => {
            cookieCategory = category;
          });
      });

      it('returns the path to the image', () => {
        expect(cookieCategory.image).to.be.equal('/img/cookies.jpg');
      });

    }); // end describe('getImage')
  }); // end describe('getterMethods')
}); // end describe('Category model')
