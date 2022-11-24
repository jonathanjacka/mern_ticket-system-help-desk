const express = require('express');
const path = require('path');
const debug = require('debug')('app:server');
const colors = require('colors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const connectDB = require('./config/db');

const errorHandler = require('./middleware/errorMiddleware');

const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

//Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(__dirname, '../frontend/build/index.html');
  });
} else {
  app.get('/', (req, res) =>
    res
      .status(200)
      .json({ message: 'Welcome to the ticket support system API' })
  );
}

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
