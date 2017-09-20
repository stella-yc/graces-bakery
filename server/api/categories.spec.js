/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');
const User = db.model('user');
const Category = db.model('category');
const Promise = require('bluebird');

describe('Category routes', () => {
  const adminAgent = request.agent(app);
  const userAgent = request.agent(app);

  // Clear database, populate database,
  // create logged in admin and user agents
  beforeEach(() => {
    return db.sync({ force: true })
      .then(() => {
        let p1 = Product.create({
          name: 'Croissant',
          description: 'Light and flaky',
          price: 5.20,
          image: 'jade-wulfraat-96023.jpg'
        });
        let p2 = Category.create({
          name: 'Pastry',
          description: 'Scrumptious'
        });
        let p3 = User.create({
          firstName: 'God',
          lastName: 'Almighty',
          email: 'god@heaven.com',
          password: '123',
          isAdmin: true
        });
        let p4 = User.create({
          firstName: 'Suzaku',
          lastName: 'Kururugi',
          email: 'knight@mare.com',
          password: '123'
        });
        return Promise.all([p1, p2, p3, p4])
      })
      .then(pArray => {
        return pArray[0].addCategory(1);
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
      })
      .catch(console.error);
  });

  describe('/api/categories/', () => {
    it('GET /api/categories - retrieves all categories', () => {
      return request(app)
        .get('/api/categories/')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.equal('Pastry');
        });
    });
    it('POST /api/categories - admin can add new category', () => {
      return adminAgent
        .post('/api/categories/')
        .send({
          name: 'Bread',
          description: 'Baked fresh daily'
        })
        .expect(201)
        .then(res => {
          expect(res.body.name).to.equal('Bread');
          expect(res.body.description).to.equal('Baked fresh daily');
        });
    });
  }); // end describe('/api/categories')

  describe('/api/categories/:cid', () => {
    it('GET /api/categories/:cid - get a single category', () => {
      return request(app)
        .get(`/api/categories/${1}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal('Pastry');
          expect(res.body.description).to.equal('Scrumptious');
          expect(res.body.products[0].name).to.equal('Croissant');
        });
    });
    it('PUT /api/categories/:cid - admin can update a product', () => {
      return adminAgent
        .put(`/api/categories/${1}`)
        .send({name: 'Yummy goods'})
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.equal(1);
          expect(res.body.name).to.equal('Yummy goods');
          expect(res.body.description).to.equal('Scrumptious');
          expect(res.body.products[0].name).to.equal('Croissant');
        });
    });
    it('DELETE /api/categories/:cid - admin can delete product', () => {
      return adminAgent
        .delete(`/api/categories/${1}`)
        .expect(204);
    });
  }); // end describe('/api/products/pid')
}); // end describe('Product routes')
