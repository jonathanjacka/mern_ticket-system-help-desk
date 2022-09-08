const router = require('express').Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require('../controllers/userControllers');

const protectedRoute = require('../middleware/authMiddleware');

router.get('/currentUser', protectedRoute, getCurrentUser);

router.post('/', registerUser);
router.post('/login', loginUser);

module.exports = router;
