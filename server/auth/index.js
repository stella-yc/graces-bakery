const router = require('express').Router();
const User = require('../db/models/user');

module.exports = router;

router.get('/whoami', (req, res) => res.json(req.user));

router.post('/login', (req, res, next) => {
  console.log('req.body,', req.body);
  return User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        res.status(400).send('User not found');
      } else if (!user.correctPassword(req.body.password)) {
        res.status(400).send('Incorrect password');
      } else {
        return req.login(user, err => (
          err ? next(err)
          : res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin
          })));
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  return User.create(req.body)
    .then((user) => {
      req.login(user, err => (
        err ? next(err)
        : res.json({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin
        })));
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists');
      } else {
        next(err);
      }
    });
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/me', (req, res) =>
  res.json(req.user)
);

router.use('/google', require('./google'));
