const ShoppingRepository = require('../database/repository/shopping-repository');
const { formateData } = require('../utils');
const { APIError } = require('../utils/app-error');

class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async PlaceOrder(userInput) {
    const { _id, txnNUmber } = userInput;

    //verify the txn number with payment logs

    try {
      const orderResult = await this.repository.createNewOrder(_id, txnNumber);
      return formateData(orderResult);
    } catch (error) {
      throw new APIError('Data not Found', error);
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      return FormateData(orders);
    } catch (err) {
      throw new APIError('Data Not found', err);
    }
  }
}

module.exports = ShoppingService;
