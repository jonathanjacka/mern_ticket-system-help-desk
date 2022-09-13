const asyncHandler = require('express-async-handler');
const debug = require('debug')('app:ticketsController');

const User = require('../models/UserModel');
const Ticket = require('../models/TicketModel');

/**
 * @desc     get all tickets by user
 * @route    GET api/tickets
 * @access   Private
 */
exports.getAllTickets = asyncHandler(async (req, res) => {
  res.json({ message: 'Get tickets!' });
});

/**
 * @desc     Create single ticket by user
 * @route    POST api/tickets
 * @access   Private
 */
exports.createTicket = asyncHandler(async (req, res) => {
  res.json({ message: 'Create ticket!' });
});
