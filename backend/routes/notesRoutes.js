const router = require('express').Router({ mergeParams: true });

const { getNotes, createNote } = require('../controllers/notesController');

const protectedRoute = require('../middleware/authMiddleware');

router.get('/', protectedRoute, getNotes);
router.post('/', protectedRoute, createNote);

module.exports = router;
