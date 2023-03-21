const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');

const startServer = async () => {
  const app = express();

  await expressApp(app);

  await databaseConnection();

  app
    .listen(PORT, () => {
      console.log(`Listening on port http://localhost:${PORT}`);
    })
    .on('error', (err) => {
      console.log(err);
      process.exit();
    });
};

startServer();
