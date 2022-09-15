const asyncHandler = require('express-async-handler');
const debug = require('debug')('app:ticketsController');

const User = require('../models/UserModel');
const Ticket = require('../models/TicketModel');

const isValidObjectId = require('../utilities/isValidObjectId');

/**
 * @desc     get all tickets by single user
 * @route    GET api/tickets
 * @access   Private
 */
exports.getAllUserTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

/**
 * @desc     get single ticket by ticket id
 * @route    GET api/tickets/:id
 * @access   Private
 */
exports.getSingleTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User reference of ticket not found');
  }

  if (!isValidObjectId(req.params.id)) {
    res.status(401);
    throw new Error('Invalid ticket Id');
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(401);
    throw new Error('Ticket not found');
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.status(200).json(ticket);
});

/**
 * @desc     Create single ticket by user
 * @route    POST api/tickets
 * @access   Private
 */
exports.createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error('Invalid details - please add product and description');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
  });

  res.status(201).json(ticket);
});

/**
 * @desc     Update single ticket by ticket id
 * @route    PUT api/tickets/:id
 * @access   Private
 */
exports.updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User reference of ticket not found');
  }

  if (!isValidObjectId(req.params.id)) {
    res.status(401);
    throw new Error('Invalid ticket Id');
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(401);
    throw new Error('Ticket not found');
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

/**
 * @desc     Delete single ticket by ticket id
 * @route    DELETE api/tickets/:id
 * @access   Private
 */
exports.deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User reference of ticket not found');
  }

  if (!isValidObjectId(req.params.id)) {
    res.status(401);
    throw new Error('Invalid ticket Id');
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(401);
    throw new Error('Ticket not found');
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const deletedTicket = await ticket.remove();
  res.status(200).json({ success: true, deletedTicket });
});
