const router = require('express').Router();

const protectedRoute = require('../middleware/authMiddleware');

const {
  getAllUserTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketsController');

router.get('/', protectedRoute, getAllUserTickets);
router.get('/:id', protectedRoute, getSingleTicket);
router.post('/', protectedRoute, createTicket);
router.put('/:id', protectedRoute, updateTicket);
router.delete('/:id', protectedRoute, deleteTicket);

module.exports = router;
