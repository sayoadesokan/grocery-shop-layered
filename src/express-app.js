const express = require('express');
const cors = require('cors');
const { customer, products, shopping } = require('./api');

module.exports = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  //api
  customer(app);
  products(app);
  shopping(app);
};
