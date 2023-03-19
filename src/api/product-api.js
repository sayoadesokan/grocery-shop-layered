const ProductService = require('../services/product-services');
const userAuth = require('../api/middleware/auth');
const CustomerService = require('../services/customer-service');

module.exports = (app) => {
  const service = new ProductService();
  const customerService = new CustomerService();

  app.post('/product/service', async (req, res, next) => {
    try {
      const { name, desc, type, unit, price, available, supplier, banner } =
        req.body;
      const { data } = await service.createProduct({
        name,
        desc,
        type,
        unit,
        price,
        available,
        supplier,
        banner,
      });

      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get('category/:type', async (req, res, next) => {
    const type = req.params.type;
    try {
      const { data } = await service.GetProductsByCategory(type);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get('/:id', async (req, res, next) => {
    const type = req.params.type;

    try {
      const { data } = await service.GetProductById(type);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post('/ids', async (req, res, next) => {
    try {
      const { ids } = req.body;
      const products = await service.GetSelectedProducts(ids);
      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  });

  app.put('/wishlist', userAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const product = await service.GetProductById(req.body._id);
      const wishList = await customerService.addToWishList(_id, product);
      return res.status(200).json(wishList);
    } catch (error) {
      next(error);
    }
  });

  app.delete('/wishlist/:id', userAuth, async (req, res, next) => {
    const { _id } = req.user;
    const productId = req.params.id;
    try {
      const product = await service.GetProductById(productId);
      const wishlist = await customerService.addToWishList(_id, product);
      return res.status(200).json(wishlist);
    } catch (error) {
      next(error);
    }
  });

  app.put('/cart', userAuth, async (req, res, next) => {
    const { _id, qty } = req.body;

    try {
      const product = await service.GetProductById(_id);

      const result = await customerService.manageCart(
        req.user._id,
        product,
        qty,
        false
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  app.delete('/cart/:id', userAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const product = await service.GetProductById(req.params.id);
      const result = await customerService.manageCart(_id, product, 0, true);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  //get Top products and category
  app.get('/', async (req, res, next) => {
    //check validation
    try {
      const { data } = await service.getProduct();
      return res.status(200).json(data);
    } catch (error) {
      next(err);
    }
  });
};
