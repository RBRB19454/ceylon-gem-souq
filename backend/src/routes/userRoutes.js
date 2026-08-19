const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const { sendVerificationApprovedEmail } = require('../utils/sendEmail');

// @desc Admin: list all users
router.get(
  '/',
  protect,
  authorize('admin'),
  asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
  })
);

// @desc Admin: verify a Gem Owner / Buyer account
router.put(
  '/:id/verify',
  protect,
  authorize('admin'),
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    user.isVerified = true;
    await user.save();
    
    // Send verification success email notification to the user in the background
    sendVerificationApprovedEmail(user);

    res.json(user);
  })
);

module.exports = router;
