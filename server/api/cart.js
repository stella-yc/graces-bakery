const router = require('express').Router();
const db = require('../db');
const Cart = db.model('cart');
const { adminOnly } = require('./authorization');

module.exports = router;

const CartProducts = Cart.scope('products');

router
  .get('/:uid', (req, res, next) => {
    return CartProducts.findOrCreate({
      where: {
        userId: req.params.uid
      }
    })
      .spread((cart, created) => {
        console.log('created: ', created);
        return res.json(cart);
      })
      .catch(next);
  })

  .put('/:cid', adminOnly, (req, res, next) => {
    return req.category.update(req.body)
    .then(updatedCat => res.status(200).json(updatedCat))
    .catch(next);
  })

