/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../index');
const User = db.model('user');

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody;

      beforeEach(() => {
        return User.create({
          firstName: 'Cody',
          lastName: 'Banks',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user;
          });
      });

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false);
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
  describe('classMethods', () => {
    describe('generateSalt', () => {
      it('generates a random string', () => {
        let salt1 = User.generateSalt();
        let salt2 = User.generateSalt();
        expect(salt1).to.not.equal(salt2);
      });
    }); // end describe('generateSalt')

    describe('encrypt password', () => {
      let password = 'not very secure';
      let salt = 'a salty solution';
      let anotherSalt = 'potato chips';
      it('returns a string that is not equal to the given password', () => {

        let encrypted = User.encryptPassword(password, salt);
        expect(encrypted).to.not.equal(password);
        expect(encrypted).to.not.equal(salt);
      });

      it('returns a different string if it uses a different salt', () => {
        let encrypted = User.encryptPassword(password, salt);
        let encrypted2 = User.encryptPassword(password, anotherSalt);
        expect(encrypted).to.not.equal(encrypted2);
      });
      it('returns the same string if it uses the same salt', () => {
        let encrypted = User.encryptPassword(password, salt);
        let encrypted2 = User.encryptPassword(password, salt);
        expect(encrypted).to.equal(encrypted2);
      });
      it('returns a different string if it uses the same salt and different password', () => {
        let encrypted = User.encryptPassword('cats', salt);
        let encrypted2 = User.encryptPassword('dogs', salt);
        expect(encrypted).to.not.equal(encrypted2);
      });
    });

    describe('hook: setSaltAndPassword', () => {
      let cody;
      beforeEach(() => {
        return User.create({
          firstName: 'Cody',
          lastName: 'Banks',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user;
          });
      });

      it('stores the encrypted password in the database', () => {
        expect(cody.password).to.not.equal('bones');
      });

      it('stores the salt in the database', () => {
        let encrypted = User.encryptPassword('bones', cody.salt);
        expect(cody.password).to.equal(encrypted);
      });
    });
  }); // end describe('classMethods')
}); // end describe('User model')
