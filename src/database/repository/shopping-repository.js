const { APIError } = require('../../utils/app-error');
const { OrderModel } = require('../models');
const { v4: uuidv4 } = require('uuid');

class ShoppingRepository {
  //payment

  async Orders(customerId) {
    try {
      const orders = await OrderModel.find({ customerId }).populate(
        'items.product'
      );
      return orders;
    } catch (error) {
      throw new APIError(
        'API ERROR',
        STATUS_CODES.INTERNAL_ERROR,
        'unable to find orders'
      );
    }
  }

  async createNewOrder(customerId, txnId) {
    //check transaction for payment status
    try {
      const profile = await customerModel
        .findById(customerId)
        .populate('cart.product');

      if (profile) {
        let amount = 0;
        let cartItems = profile.cart;

        if (cartItems.length > 0) {
          cartItems.map((items) => {
            amount += parseInt(item.product.price) * parseInt(item.unit);
          });

          const orderId = uuidv4();
        }
      }
    } catch (error) {}
  }
}

module.exports = ShoppingRepository;
