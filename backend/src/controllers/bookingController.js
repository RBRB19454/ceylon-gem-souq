const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');

// @desc    Buyer sends a booking/inquiry request for a listing
// @route   POST /api/bookings   body: { listingId, message }
const createBooking = asyncHandler(async (req, res) => {
  if (!req.user.isVerified) {
    res.status(403);
    throw new Error('Your account must be verified by an administrator before you can request bookings.');
  }

  const { listingId, message } = req.body;

  const listing = await Listing.findById(listingId);
  if (!listing || listing.status !== 'approved') {
    res.status(404);
    throw new Error('Listing not available for booking');
  }

  const booking = await Booking.create({
    listing: listing._id,
    buyer: req.user._id,
    owner: listing.owner,
    message,
  });

  res.status(201).json(booking);
});

// @desc    Owner accepts or declines a booking request
// @route   PUT /api/bookings/:id/respond   body: { status: 'accepted' | 'declined' }
const respondToBooking = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['accepted', 'declined'].includes(status)) {
    res.status(400);
    throw new Error("Status must be 'accepted' or 'declined'");
  }

  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  if (booking.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to respond to this booking');
  }

  booking.status = status;
  if (status === 'accepted') booking.acceptedAt = new Date();
  await booking.save();
  res.json(booking);
});

// @desc    Get bookings belonging to the logged-in buyer or owner
// @route   GET /api/bookings/mine
const getMyBookings = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'owner' ? { owner: req.user._id } : { buyer: req.user._id };
  const bookings = await Booking.find(filter)
    .populate('listing')
    .populate('buyer', 'name email')
    .populate('owner', 'name email');
  res.json(bookings);
});

// @desc    Admin: view all bookings across the platform
// @route   GET /api/bookings/admin/all
const getAllBookingsAdmin = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate('listing')
    .populate('buyer', 'name email')
    .populate('owner', 'name email');
  res.json(bookings);
});

module.exports = { createBooking, respondToBooking, getMyBookings, getAllBookingsAdmin };
