const CustomerRepository = require('../database/repository/customer-repository');
const {
  ValidatePasswords,
  generateSignature,
  formateData,
  generateSalt,
  generatePassword,
} = require('../utils');
const { APIError } = require('../utils/app-error');

//Business Logic
class CustomerService {
  constructor() {
    this.repository = new CustomerRepository();
  }

  async signIn(userInputs) {
    const { email, password } = userInputs;
    try {
      const existingCustomer = await this.repository.findCustomer({ email });

      if (existingCustomer) {
        const validPassword = await ValidatePasswords(
          password,
          existingCustomer.password,
          existingCustomer.salt
        );

        if (validPassword) {
          const token = await generateSignature({
            email: existingCustomer.email,
            _id: existingCustomer._id,
          });
          return formateData({ id: existingCustomer._id, token });
        }
      }
      return formateData(null);
    } catch (error) {
      throw new APIError('Data Not Found', err);
    }
  }

  async signUp(userInputs) {
    const { email, password, phone } = userInputs;

    try {
      //Create Salts
      let salt = await generateSalt();
      let userPassword = await generatePassword(password, salt);
      const existingCustomer = await this.repository.createCustomer({
        email,
        password: userPassword,
        phone,
        salt,
      });

      const token = await generateSignature({
        email: email,
        _id: existingCustomer._id,
      });

      return formateData({ id: existingCustomer._id, token });
    } catch (error) {
      throw new APIError('Data Not found', err);
    }
  }

  async AddNewAddress(_id, userInputs) {
    const { street, postalCode, city, country } = userInputs;

    try {
      const addressResult = await this.repository.createAddress({
        _id,
        street,
        postalCode,
        city,
        country,
      });

      return formateData(addressResult);
    } catch (error) {
      throw new APIError('Data Not found', err);
    }
  }

  async getProfile(id) {
    try {
      const existingCustomer = await this.repository.findCustomerId({ id });

      return formateData(existingCustomer);
    } catch (error) {
      throw new APIError('Data Not found', err);
    }
  }

  async getShoppingDetails(id) {
    try {
      const existingCustomer = await this.repository.findCustomerId({ id });
      4;

      if (existingCustomer) {
        return formateData(existingCustomer);
      }

      return formateData({ msg: Error });
    } catch (error) {
      throw new APIError('Data Not found', err);
    }
  }

  async getWishList(customerId) {
    try {
      const wishlistItems = await this.repository.wishList({ customerId });
      if (wishlistItems) {
        return formateData(wishlistItems);
      }
    } catch (error) {
      throw new APIError('Data Not Found', err);
    }
  }

  async addToWishList(customerId, product) {
    try {
      const wishlistResult = await this.repository.addWishListItem(
        customerId,
        product
      );

      return formateData(wishlistResult);
    } catch (error) {
      throw new APIError('Data Not Found', err);
    }
  }

  async manageCart(customerId, product, qty, isRemove) {
    try {
      const cartResult = await this.repository.addCartItem(
        customerId,
        product,
        qty,
        isRemove
      );
      return formateData(cartResult);
    } catch (error) {
      throw new APIError('Data Not Found', err);
    }
  }

  async manageOrder(customerId, order) {
    try {
      const orderResult = await this.repository.AddOrderToProfile(
        customerId,
        order
      );
      return formateData(orderResult);
    } catch (error) {
      throw new APIError('Data Not Found', err);
    }
  }

  async subscribeEvent(payload) {
    const { event, data } = payload;

    const { userId, product, order, qty } = data;

    switch (event) {
      case 'ADD_TO_WISHLIST':
      case 'REMOVE_FROM_WISHLIST':
        this.AddToWishlist(userId, product);
        break;
      case 'ADD_TO_CART':
        this.ManageCart(userId, product, qty, false);
        break;
      case 'REMOVE_FROM_CART':
        this.ManageCart(userId, product, qty, true);
        break;
      case 'CREATE_ORDER':
        this.ManageOrder(userId, order);
        break;
      default:
        break;
    }
  }
}

module.exports = CustomerService;
