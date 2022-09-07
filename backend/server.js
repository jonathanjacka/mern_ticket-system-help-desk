const express = require('express');
const debug = require('debug')('app:server');
const colors = require('colors');
const dotenv = require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.json('Server is up! Weclome to the Ticket System Help Desk API');
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  debug(
    colors.inverse.green(
      `Server is running in ${process.env.NODE_ENV} on port ${PORT} - Hello there...`
    )
  );
});
