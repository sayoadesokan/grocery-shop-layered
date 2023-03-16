const mongoose = require('mongoose');

// const {DB_URL} = require()

module.exports = async () => {
  try {
    await mongoose.connect();
    console.log('Database is connected');
  } catch (error) {
    console.log('Error==========');
    console.log(error);
    process.exit(1);
  }
};
