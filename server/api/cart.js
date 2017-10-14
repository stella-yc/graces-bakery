const router = require('express').Router();
const db = require('../db');
const Cart = db.model('cart');
const CartDetail = db.model('CartDetail');

module.exports = router;

const CartProducts = Cart.scope('products');

const makeNewCart = (session, res) =>
  CartProducts.create({})
    .then(cart => {
      session.cartId = cart.id;
      return res.json(cart);
    });

router

  .get('/', (req, res, next) => {

    // if the user is NOT logged in
    if (!req.user) {
      // if the user already has a cart
      if (req.session.cartId) {
        return CartProducts.findById(req.session.cartId)
          .then(cart => {
            if (!cart) {  // in case the cart id does not match up with any in db
              return makeNewCart(req.session, res);
            } else {
              return res.json(cart);
            }
          })
          .catch(next);
      }
      // if the user does not have a cart yet
        return makeNewCart(session, res)
          .catch(next);
    }

    // if the user is logged in
    return CartProducts.findOrCreate({
      where: { userId: req.user.id }
    })
      .spread((cart, _) => res.json(cart))
      .catch(next);
  })

  .param('cid', (req, res, next, cid) => {
    return CartProducts.findOne({
      where: { id: cid }
    })
      .then(cart => {
        req.cart = cart;
        next();
        return cart;
      })
      .catch(next);
  })

  .get('/:cid', (req, res, next) => {
    return res.json(req.cart);
  })

  .put('/:cid/addProduct', (req, res, next) => {
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
      return CartProducts.findById(req.params.cid);
    })
    .then((updatedCart) => res.json(updatedCart))
    .catch(next);
  })

  .put('/:cid/editCart', (req, res, next) => {
    const productId = req.body.productId;
    const quantity = +req.body.quantity;
    return req.cart.addProduct(productId, { through: { quantity: quantity } })
    .then(() =>
      CartProducts.findById(req.params.cid)
    )
    .then((updatedCart) => res.json(updatedCart))
    .catch(next);
  })

  .put('/:cid/removeProduct', (req, res, next) => {
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

