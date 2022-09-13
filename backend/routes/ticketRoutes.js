const router = require('express').Router();

const protectedRoute = require('../middleware/authMiddleware');

const {
  getAllTickets,
  createTicket,
} = require('../controllers/ticketsController');

router.get('/', protectedRoute, getAllTickets);
router.post('/', protectedRoute, createTicket);

module.exports = router;
