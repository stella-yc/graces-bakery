const router = require('express').Router();
const db = require('../db');
const Category = db.model('category');
const { adminOnly } = require('./authorization');

module.exports = router;

const pCategory = Category.scope('products');

router
  .param('cid', (req, res, next, cid) => {
    return pCategory.findOne({
      where: {
        name: cid
      }
    })
    .then(category => {
      if (!category) {
        const err = new Error('Category does not exist');
        err.status = 404; // not this
        throw err;
      } else {
        req.category = category;
        next();
      }
    })
    .catch(next);
  })

  .get('/', (req, res, next) => {
    return Category.findAll({})
      .then(categories => res.json(categories))
      .catch(next);
  })

  .post('/', adminOnly, (req, res, next) => {
    let { name, description, displayName } = req.body;
    return Category.create({
      name,
      displayName,
      description,
    })
    .then(category => res.status(201).json(category))
    .catch(next);
  })

  .get('/:cid', (req, res, next) =>
    res.json(req.category)
  )

  .put('/:cid', adminOnly, (req, res, next) => {
    return req.category.update(req.body)
    .then(updatedCat => res.status(200).json(updatedCat))
    .catch(next);
  })

  .delete('/:cid', adminOnly, (req, res, next) => {
    return req.category.destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
  });
