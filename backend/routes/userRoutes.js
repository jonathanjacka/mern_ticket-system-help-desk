const router = require('express').Router();
const debug = require('debug')('app:routes');

const { registerUser, loginUser } = require('../controllers/userControllers');

router.post('/', registerUser);
router.post('/login', loginUser);

module.exports = router;
