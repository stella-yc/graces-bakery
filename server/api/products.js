const router = require('express').Router();
const { Product } = require('../db/models');
const { adminOnly } = require('./authorization');

module.exports = router;

const cProduct = Product.scope('categories');

router
  .param('pid', (req, res, next, pid) => {
    cProduct.findById(pid)
    .then(product => {
      if (!product) {
        const err = new Error('Product does not exist');
        err.status = 403; // not this
        throw err;
      } else {
        req.product = product;
        next();
      }
    })
    .catch(next);
  })

  .get('/', (req, res, next) => {
    cProduct.findAll({})
      .then(products => res.json(products))
      .catch(next);
  })

  .post('/', adminOnly, (req, res, next) => {
    let { name, description, price, image } = req.body;
    let categoryIds = req.body.categoryIds;
    return Product.create({
      name,
      description,
      price,
      image
    })
    .then(prod => {
      return prod.addCategory(...categoryIds)
      .then(() => {
        return res.status(201).json(prod);
      });
    })
    .catch(next);
  })

  .get('/:pid', (req, res, next) =>
    res.json(req.product)
  )

  .put('/:pid', adminOnly, (req, res, next) => {
    return req.product.update(req.body)
    .then(updatedProduct => res.status(200).json(updatedProduct))
    .catch(next);
  })

  .delete('/:pid', adminOnly, (req, res, next) => {
    req.product.destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
  });
