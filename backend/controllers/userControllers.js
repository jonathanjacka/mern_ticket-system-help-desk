const debug = require('debug')('app:userController');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const generateToken = require('../utilities/generateToken');

const User = require('../models/UserModel');

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

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User email already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!newUser) {
    res.status(400);
    throw new Error('Invalid user data; user not created');
  } else {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  }
});

/**
 * @desc     Login user
 * @route    POST api/users/login
 * @access   Public
 */
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error('Invalid login credentials');
  } else {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }
});

/**
 * @desc     get current user logged in
 * @route    GET api/users/currentUser
 * @access   Private
 */
exports.getCurrentUser = asyncHandler(async (req, res) => {
  const currentUser = {
    name: req.user.name,
    email: req.user.email,
    id: req.user._id,
  };
  res.json(currentUser);
});
