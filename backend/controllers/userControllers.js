const debug = require('debug')('app:controllers');
const asyncHandler = require('express-async-handler');

/**
 * @desc     Register a new user
 * @route    POST api/users
 * @access   Public
 */
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields to register!');
  }

  res.json({ message: 'Register user' });
});

/**
 * @desc     Login user
 * @route    POST api/users/login
 * @access   Public
 */
exports.loginUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Login user' });
});
