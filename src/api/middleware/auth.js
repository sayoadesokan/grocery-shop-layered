const { validateSignature } = require('../../utils');

module.exports = async (req, res, next) => {
  const isAuthorized = await validateSignature(req);
  if (isAuthorized) {
    return next();
  }
  return res.status(403).json({ message: 'Not Authorized' });
};
