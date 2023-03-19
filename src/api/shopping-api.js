const ShoppingService = require('../services/shopping-service');
const CustomerService = require('../services/customer-service');
const userAuth = require('./middleware/auth');

module.exports = (app) => {
  const service = new ShoppingService();
  const userService = new CustomerService();

  app.post('/shopping/order', userAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;
    try {
      const { data } = await service.PlaceOrder({ _id, txnNumber });
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get('/shopping/orders', userAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const { data } = await userService.getShoppingDetails(_id);
      return res.status(200).json(data.orders);
    } catch (err) {
      next(err);
    }
  });

  app.get('/shopping/cart', userAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const { data } = await userService.getShoppingDetails(_id);
      return res.status(200).json(data.cart);
    } catch (err) {
      next(err);
    }
  });
};
