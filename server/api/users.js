const router = require('express').Router();
const { User } = require('../db/models');
const { selfOnly, adminOnly, selfOrAdmin } = require('./authorization');

module.exports = router;

router
  .param('uid', (req, res, next, uid) => {
    User.findById(uid, {
      attributes: ['firstName', 'lastName', 'id', 'email']
    })
    .then(user => {
      if (!user) {
        const err = new Error('User does not exist');
        err.status = 403;
        throw err;
      } else {
        req.requestedUser = user;
        next();
      }
    });
  })

  .get('/', adminOnly, (req, res, next) => {
    User.findAll({
      // explicitly select only the id and email fields
      attributes: ['id', 'email']
    })
      .then(users => res.json(users))
      .catch(next);
  })

  .get('/:uid', selfOrAdmin, (req, res, next) =>
    res.json(req.requestedUser)
  );

