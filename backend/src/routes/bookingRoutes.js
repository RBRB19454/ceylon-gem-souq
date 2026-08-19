const express = require('express');
const router = express.Router();
const {
  createBooking,
  respondToBooking,
  getMyBookings,
  getAllBookingsAdmin,
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('buyer'), createBooking);
router.put('/:id/respond', protect, authorize('owner'), respondToBooking);
router.get('/mine', protect, authorize('buyer', 'owner'), getMyBookings);
router.get('/admin/all', protect, authorize('admin'), getAllBookingsAdmin);

module.exports = router;
