const ProductRepository = require('../database/repository/product-repository');
const { formateData } = require('../utils');
const { APIError } = require('../utils/app-error');

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  async createProduct(productInput) {
    try {
      const productResult = await this.repository.createProduct(productInput);
      return formateData(productResult);
    } catch (error) {
      throw new APIError('Data Not Found');
    }
  }

  async getProduct() {
    try {
      const products = await this.repository.Product();
      let categories = {};

      products.map(({ type }) => {
        categories[type] = type;
      });

      return formateData({
        products,
        categories: Object.keys(categories),
      });
    } catch (error) {
      throw new APIError('Data Not Found');
    }
  }

  async getProductDescription(productId) {
    try {
      const product = await this.repository.FindById(productId);
      return formateData(product);
    } catch (error) {
      throw new APIError('Data Not Found');
    }
  }

  async GetProductsByCategory(category) {
    try {
      const products = await this.repository.FindByCategory(category);
      return FormateData(products);
    } catch (err) {
      throw new APIError('Data Not found');
    }
  }

  async GetSelectedProducts(selectedIds) {
    try {
      const products = await this.repository.FindSelectedProducts(selectedIds);
      return FormateData(products);
    } catch (err) {
      throw new APIError('Data Not found');
    }
  }

  async GetProductById(productId) {
    try {
      return await this.repository.FindById(productId);
    } catch (err) {
      throw new APIError('Data Not found');
    }
  }
}

module.exports = ProductService;
