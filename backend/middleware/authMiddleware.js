const asyncHandler = require('express-async-handler');
const debug = require('debug')('app:authMiddleware');

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const User = require('../models/UserModel');

const protectedRoute = asyncHandler(async (req, res, next) => {
  let userToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      userToken = req.headers.authorization.split(' ')[1];
      const decodedUserToken = jwt.verify(userToken, secret);
      req.user = await User.findById(decodedUserToken.userId).select(
        '-password'
      );
      next();
    } catch (error) {
      debug(error.message);
      res.status(401);
      throw new Error('Not authorized to access');
    }
  }

  if (!userToken) {
    res.status(401);
    throw new Error('Not authorized to access');
  }
});

module.exports = protectedRoute;
