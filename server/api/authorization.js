const isLoggedIn = (user) => {
  if (!user) {
    const err = new Error('You must be logged in');
    err.status = 401;
    throw err;
  }
};

const unAuthError = () => {
  const err = new Error('You are unauthorized to view this page');
  err.status = 403;
  throw err;
};

const selfOnly = (req, res, next) => {
  isLoggedIn(req.user);
  if (req.params.uid !== req.user.id) {
    unAuthError();
  }
  next();
};

const adminOnly = (req, res, next) => {
  isLoggedIn(req.user);
  if (!req.user.isAdmin) {
    unAuthError();
  }
  next();
};

const selfOrAdmin = (req, res, next) => {
  isLoggedIn(req.user);
  if (!req.user.isAdmin && req.params.uid !== req.user.id) {
    unAuthError();
  }
  next();
};

module.exports = { selfOnly, adminOnly, selfOrAdmin };
