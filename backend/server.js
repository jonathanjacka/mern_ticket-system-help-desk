const express = require('express');
const path = require('path');
const debug = require('debug')('app:server');
const colors = require('colors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const connectDB = require('./config/db');

const errorHandler = require('./middleware/errorMiddleware');

const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api/users', userRoutes);

//Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  debug(
    colors.inverse.green(
      `Server is running in ${process.env.NODE_ENV} on port ${PORT} - Hello there...`
    )
  );
});
