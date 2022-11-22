const asyncHandler = require('express-async-handler');
const debug = require('debug')('app:ticketsController');

const User = require('../models/UserModel');
const Ticket = require('../models/TicketModel');
const Note = require('../models/NotesModel');

const isValidObjectId = require('../utilities/isValidObjectId');

/**
 * @desc     get all notes by single user
 * @route    GET api/tickets/:ticketId/notes
 * @access   Private
 */
exports.getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (!isValidObjectId(req.params.ticketId)) {
    res.status(401);
    throw new Error('Invalid ticket Id');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const notes = await Note.find({ ticket: req.params.ticketId });
  res.status(200).json(notes);
});

/**
 * @desc     Create note for ticket
 * @route    POST api/tickets/:ticketId/notes
 * @access   Private
 */
exports.createNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (!isValidObjectId(req.params.ticketId)) {
    res.status(401);
    throw new Error('Invalid ticket Id');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const newNote = await Note.create({
    user: req.user.id,
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
  });
  res.status(200).json(newNote);
});
