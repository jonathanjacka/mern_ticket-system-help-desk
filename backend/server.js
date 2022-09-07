const express = require('express');
const path = require('path');
const debug = require('debug')('app:server');
const colors = require('colors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');

const app = express();

const userRoutes = require('./routes/userRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  debug(
    colors.inverse.green(
      `Server is running in ${process.env.NODE_ENV} on port ${PORT} - Hello there...`
    )
  );
});
