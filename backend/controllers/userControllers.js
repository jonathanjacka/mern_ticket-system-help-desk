const debug = require('debug')('app:controllers');

/**
 * @desc     Register a new user
 * @route    POST api/users
 * @access   Public
 */
exports.registerUser = (req, res) => {
  debug(req.body);
  res.json({ message: 'Register user' });
};

/**
 * @desc     Login user
 * @route    POST api/users/login
 * @access   Public
 */
exports.loginUser = (req, res) => {
  res.json({ message: 'Login user' });
};
