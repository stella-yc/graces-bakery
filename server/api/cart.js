const router = require('express').Router();
const db = require('../db');
const Cart = db.model('cart');
const CartDetail = db.model('CartDetail');
const { selfOnly, selfOrAdmin  } = require('./authorization');

module.exports = router;

const CartProducts = Cart.scope('products');

router
  .param('uid', (req, res, next, uid) => {
    return CartProducts.findOrCreate({
      where: {
        userId: uid
      }
    })
      .spread((cart, created) => {
        req.cart = cart;
        next();
        return cart;
      })
      .catch(next);
  })

  .get('/:uid', selfOrAdmin, (req, res, next) => {
    return res.json(req.cart);
  })

  .put('/:uid/addProduct', selfOnly, (req, res, next) => {
    const productId = req.body.productId;
    const quantity = +req.body.quantity;
    return CartDetail.findOrCreate({
      where: {
        cartId: req.cart.id,
        productId: productId
      }
    })
    .spread((cartDetail, _) => {
      let oldQuantity = +cartDetail.quantity;
      let newQuantity = quantity + oldQuantity;
      return req.cart.addProduct(productId, { through: { quantity: newQuantity } });
    })
    .then(() => {
      return CartProducts.findOne({
        where: {
          userId: req.params.uid
        }
      });
    })
    .then((updatedCart) => res.json(updatedCart))
    .catch(next);
  })

  .put('/:uid/editCart', selfOrAdmin, (req, res, next) => {
    const productId = req.body.productId;
    const quantity = +req.body.quantity;
    return req.cart.addProduct(productId, { through: { quantity: quantity } })
    .then(() => {
      return CartProducts.findOne({
        where: {
          userId: req.params.uid
        }
      });
    })
    .then((updatedCart) => res.json(updatedCart))
    .catch(next);
  })

  .put('/:uid/removeProduct', selfOrAdmin, (req, res, next) => {
    const productId = req.body.productId;
    return CartDetail.findOne({
      where: {
        cartId: req.cart.id,
        productId: productId
      }
    })
    .then(cartDetail => cartDetail.destroy())
    .then(() => res.json(req.cart))
    .catch(next);
  });

