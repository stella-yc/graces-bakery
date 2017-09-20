/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');
const Promise = require('bluebird');

describe('User routes', () => {
  const codysEmail = 'cody@puppybook.com';
  const adminAgent = request.agent(app);
  const userAgent = request.agent(app);
  let cody, suzaku;
  beforeEach(() => {
    return db.sync({ force: true })
      .then(() => {
        const accounts = [
          {
            firstName: 'Cody',
            lastName: 'Banks',
            email: codysEmail,
            password: 'bones'
          },
          {
            firstName: 'God',
            lastName: 'Almighty',
            email: 'god@heaven.com',
            password: '123',
            isAdmin: true
          },
          {
            firstName: 'Suzaku',
            lastName: 'Kururugi',
            email: 'knight@mare.com',
            password: '123'
          }
        ]
        return Promise.map(accounts, account => User.create(account))
          .then(profiles => {
            cody = profiles[0];
            suzaku = profiles[2];
          })
          .then(() => {
            return adminAgent
              .post('/auth/login')
              .send({ email: 'god@heaven.com', password: '123' })
              .expect(200);
          })
          .then(() => {
            return userAgent
              .post('/auth/login')
              .send({ email: 'knight@mare.com', password: '123' })
              .expect(200);
          });
      });
  });

  describe('/api/users/', () => {
    xit('GET /api/users - 401 if no user is not logged in', () => {
      return request(app)
        .get('/api/users')
        .expect(401);
    });

    xit('GET /api/users - 403 if admin is not logged in', () => {
      return userAgent
        .get('/api/users')
        .expect(403);
    });

    xit('GET /api/users - admin sees users', () => {
      return adminAgent
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(3);
        });
    });
  }) // end describe('/api/users')

  describe('/api/users/:uid', () => {
    xit('GET /api/users/:uid - sends requested user if admin', () => {
      let uid = cody.id;
      return adminAgent
        .get(`/api/users/${uid}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.email).to.equal(codysEmail);
        });
    });
    xit('GET /api/users/:uid - sends requested user if self', () => {
      let uid = suzaku.id;
      return userAgent
        .get(`/api/users/${uid}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.email).to.equal(suzaku.email);
        });
    });
    xit('GET /api/users/:uid - 403 if requested user is NOT self', () => {
      let uid = cody.id;
      return userAgent
        .get(`/api/users/${uid}`)
        .expect(403);
    });
  }) // end describe('/api/users/uid')
}) // end describe('User routes')
