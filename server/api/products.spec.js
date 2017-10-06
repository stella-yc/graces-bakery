/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');
const User = db.model('user');
const Category = db.model('category');
const Promise = require('bluebird');

describe('Product routes', () => {
  const adminAgent = request.agent(app);
  const userAgent = request.agent(app);
  let testProduct;

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
          displayName: 'Pastry',
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
        testProduct = pArray[0];
        return testProduct.addCategory(1);
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

  describe('/api/products/', () => {
    it('GET /api/products - retrieves all products', () => {
      return request(app)
        .get('/api/products/')
        .expect(200)
        .then(res => {
          console.log('****', res.body);
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.equal('Croissant');
          expect(res.body[0].categories[0].id).to.equal(1);
          expect(res.body[0].categories[0].name).to.equal('Pastry');
        });
    });
    it('POST /api/products - admin can add new product', () => {
      return adminAgent
        .post('/api/products/')
        .send({
          name: 'Donut',
          description: 'Fried doughy goodness',
          price: 10.20,
          image: 'jade-wulfraat-96023.jpg',
          categoryIds: [1]
        })
        .expect(201)
        .then(res => {
          expect(res.body.image).to.equal('/img/jade-wulfraat-96023.jpg');
          expect(res.body.name).to.equal('Donut');
        });
    });
  }); // end describe('/api/products')

  describe('/api/products/:pid', () => {
    it('GET /api/products/:pid - get a single product', () => {
      let pid = testProduct.id;
      return request(app)
        .get(`/api/products/${pid}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal('Croissant');
          expect(res.body.image).to.equal('/img/jade-wulfraat-96023.jpg');
        });
    });
    it('PUT /api/products/:pid - admin can update a product', () => {
      let pid = testProduct.id;
      return adminAgent
        .put(`/api/products/${pid}`)
        .send({name: 'Cookie'})
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.equal(pid);
          expect(res.body.name).to.equal('Cookie');
          expect(res.body.categories[0].name).to.equal('Pastry');
        });
    });
    it('DELETE /api/products/:pid - admin can delete product', () => {
      let pid = testProduct.id;
      return adminAgent
        .delete(`/api/products/${pid}`)
        .expect(204);
    });
  }); // end describe('/api/products/pid')
}); // end describe('Product routes')
