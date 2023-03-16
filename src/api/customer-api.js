const CustomerService = require('../services/customer-service');
const userAuth = require('./middleware/auth');

module.exports = (app) => {
  const service = new CustomerService();

  app.post('/customer/signup', async (req, res, next) => {
    try {
      const { email, password, phone } = req.body;
      const { data } = await service.signUp({ email, password, phone });
      res.json(data);
    } catch (error) {
      next(err);
    }
  });

  app.post('/customer/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { data } = await service.signIn({ email, password });
      return res.json(data);
    } catch (error) {
      next(err);
    }
  });

  app.post('/customer/address', userAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { street, postalCode, city, country } = req.body;
      const { data } = await service.AddNewAddress(_id, {
        street,
        postalCode,
        city,
        country,
      });

      return res.json(data);
    } catch (error) {
      next(err);
    }
  });

  app.get('/customer/profile', userAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.getProfile({ _id });
      res.json(data);
    } catch (error) {
      next(err);
    }
  });

  app.get('/customer/shopping-details', userAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.getProfile({ _id });
      return res.json(data);
    } catch (error) {
      next(err);
    }
  });

  app.get('/customer/wishlist', userAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.getWishList(_id);

      return res.json(data);
    } catch (error) {
      next(err);
    }
  });
};
