const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { validateRegister, validateLogin, validate } = require('../middlewares/validators');

router.post('/register', validateRegister, validate, registerUser);
router.post('/login', validateLogin, validate, loginUser);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateUserProfile);

module.exports = router;