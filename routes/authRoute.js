const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
} = require('../controllers/authController');
const authenticateUser = require('../middleware/authenticateUser');
const testUser = require('../middleware/testUser');
const rateLimiter = require('express-rate-limit');
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    msg: 'Too many requests from this IP, please try again after 15 minutes',
  },
});
router.post('/register', apiLimiter, registerUser);
router.post('/login', apiLimiter, loginUser);
router.patch('/updateUser', authenticateUser, testUser, updateUser);
module.exports = router;
