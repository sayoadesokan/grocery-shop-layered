const mongoose = require('mongoose');
const { DB_URL } = require('../config');

module.exports = async () => {
  try {
    const conn = await mongoose.connect(DB_URL);
    console.log('Database is connected');
  } catch (error) {
    console.log('Error==========');
    console.log(error.message);
    process.exit(1);
  }
};
