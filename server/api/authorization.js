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
  let paramId = +req.params.uid;
  let userId = +req.user.id;
  if (paramId !== userId) {
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
  let routeUid = +req.params.uid;
  let userUid = +req.user.id;
  if (!req.user.isAdmin && routeUid !== userUid) {
    unAuthError();
  }
  next();
};

module.exports = { selfOnly, adminOnly, selfOrAdmin };
