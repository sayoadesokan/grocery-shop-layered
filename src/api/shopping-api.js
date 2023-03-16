const ShoppingService = require('../services/shopping-service');
const CustomerService = require('../services/customer-service');
const userAuth = require('./middleware/auth');

module.exports = (app) => {
  const service = new ShoppingService();
  const userService = new CustomerService();

  app.post('/shopping/order', userAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;
  });
};
