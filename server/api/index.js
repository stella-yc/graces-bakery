const router = require('express').Router();
module.exports = router;

router
  .use('/users', require('./users'))
  .use('/products', require('./products'))
  .use('/categories', require('./categories'))
  .use('/cart', require('./cart'))

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
