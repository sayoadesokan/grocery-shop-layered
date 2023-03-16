const { APIError } = require('../../utils/app-error');
const { CustomerModel, AddressModel } = require('../models');

class CustomerRepository {
  async createCustomer({ email, password, phone, salt }) {
    try {
      const customer = new CustomerModel({
        email,
        password,
        salt,
        phone,
        address: [],
      });
      const customerResult = customer.save();
      return customerResult;
    } catch (error) {
      throw new APIError(
        'API ERROR',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to create customer'
      );
    }
  }

  async createAddress(_id, street, postalCode, city, country) {
    try {
      const profile = await CustomerModel.findById({ _id });

      if (profile) {
        const newAddress = new AddressModel({
          street,
          postalCode,
          city,
          country,
        });

        const savedAddress = await newAddress.save();
        return savedAddress;
      }
    } catch (error) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Error on Create Address'
      );
    }
  }

  async findCustomer({ email }) {
    try {
      const findCustomer = await CustomerModel.findOne({ email: email });
      return findCustomer;
    } catch (error) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Find Customer'
      );
    }
  }

  async findCustomerId({ _id }) {
    try {
      const existingCustomer = await CustomerModel.findById({ id: _id })
        .populate('address')
        .populate('wishlist')
        .populate('orders')
        .populate('cart.product');
      return existingCustomer;
    } catch (error) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Find Customers'
      );
    }
  }

  async wishList(customerId) {
    try {
      const profile = await CustomerModel.findById(customerId).populate(
        'wishlist'
      );

      return profile.wishlist;
    } catch (error) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to get Wishlist'
      );
    }
  }

  async addWishListItem(customerId, product) {
    try {
      const profile = await CustomerModel.findById(customerId).populate(
        'wishlist'
      );
      if (profile) {
        let wishlist = profile.wishlist;

        if (wishlist.length > 0) {
          let isExist = false;
          wishlist.map((item) => {
            if (item._id.toString() === product._id.toString()) {
              const index = wishlist.indexOf(item);
              wishlist.splice(index, 1);
              isExist = true;
            }
          });

          if (!isExist) {
            wishlist.push(product);
          }
        } else {
          wishlist.push(product);
        }
      }
    } catch (error) {
      throw new Error(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Add to WishList'
      );
    }
  }
  async addCartItem(customerId, product, qty, isRemoved) {
    try {
      const profile = CustomerModel.find(customerId).populate('cart.populate');

      if (profile) {
        const cartItem = {
          product,
          unit: qty,
        };

        let cartItems = profile.cart;

        if (cartItems.length > 0) {
          let isExist = false;
          cartItems.map((items) => {
            if (items.product._id.toString() === product._id.toString()) {
              if (isRemoved) {
                cartItems.splice(cartItems.indexOf(items), 1);
              } else {
                item.unit = qty;
              }
              isExist = true;
            }
          });

          if (!isExist) {
            cartItems.push(cartItem);
          }
        } else {
          cartItems.push(cartItem);
        }

        profile.cart = cartItems;
        const cartSaveResult = await profile.save();
        return cartSaveResult;
      }
    } catch (error) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Create Customer'
      );
    }
  }

  async AddOrderToProfile(customerId, order) {
    try {
      const profile = await CustomerModel.findById(customerId);

      if (profile) {
        if (profile.orders == undefined) {
          profile.orders = [];
        }
        profile.orders.push(order);

        profile.cart = [];

        const profileResult = await profile.save();

        return profileResult;
      }

      throw new Error('Unable to add to order!');
    } catch (err) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Create Customer'
      );
    }
  }
}

module.exports = CustomerRepository;
