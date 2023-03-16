const { APIError } = require('../../utils/app-error');
const { ProductModel } = require('../models');

class ProductRepository {
  async createProduct(
    name,
    desc,
    type,
    unit,
    price,
    available,
    supplier,
    banner
  ) {
    try {
      const product = new ProductModel({
        name,
        desc,
        type,
        unit,
        price,
        available,
        supplier,
        banner,
      });

      const newProduct = product.save();
      return newProduct;
    } catch (error) {
      throw new APIError(
        'API ERROR',
        STATUS_CODE.INTERNAL_ERROR,
        'Unable to create Product'
      );
    }
  }

  async Product() {
    try {
      return await ProductModel.find();
    } catch (error) {
      throw new APIError(
        'API ERROR',
        STATUS_CODE.INTERNAL_ERROR,
        'Unable to Find Product'
      );
    }
  }

  async findByCategory(category) {
    try {
      const product = await product.find({ type: category });
      return product;
    } catch (error) {
      throw new APIError(
        'API ERROR',
        STATUS_CODE.INTERNAL_ERROR,
        'Unable to Find Category '
      );
    }
  }

  async findSelectedProducts(selectedId) {
    try {
      const products = await ProductModel.find();
      const findId = product.map((item) => {
        item._id;
      });
      return findId;
    } catch (error) {
      throw new APIError(
        'API ERROR',
        STATUS_CODE.INTERNAL_ERROR,
        'Unable to Find Product'
      );
    }
  }
}

module.exports = ProductRepository;
