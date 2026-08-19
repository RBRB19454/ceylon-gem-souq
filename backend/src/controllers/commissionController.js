const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Commission = require('../models/Commission');
const Listing = require('../models/Listing');

// @desc    Admin marks an accepted deal as completed and records commission.
//          Uses a MongoDB transaction so the booking status change and the
//          commission record are written together, or not at all.
// @route   POST /api/commissions/complete
// @body    { bookingId, buyerCommission, ownerCommission, currency }
const completeDealWithCommission = asyncHandler(async (req, res) => {
  const { bookingId, buyerCommission, ownerCommission, currency } = req.body;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const booking = await Booking.findById(bookingId).session(session);
    if (!booking) {
      throw new Error('Booking not found');
    }
    if (booking.status !== 'accepted') {
      throw new Error('Booking must be accepted before it can be marked complete');
    }

    booking.status = 'completed';
    booking.completedAt = new Date();
    await booking.save({ session });

    // The physical stone is one-of-a-kind — once a deal on it is complete,
    // it must come off the public marketplace and any other outstanding
    // requests for the same gem need to be closed out, or a second buyer
    // could still book (and an owner could still accidentally accept) a
    // gem that's already sold.
    await Listing.findByIdAndUpdate(booking.listing, { status: 'sold' }, { session });
    await Booking.updateMany(
      { listing: booking.listing, status: 'requested', _id: { $ne: booking._id } },
      { status: 'declined' },
      { session }
    );

    const created = await Commission.create(
      [
        {
          booking: booking._id,
          buyerCommission,
          ownerCommission,
          currency: currency || 'USD',
          markedCompleteBy: req.user._id,
          completedAt: new Date(),
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(created[0]);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400);
    throw error;
  }
});

// @desc    Admin: reporting - list all commissions with full deal context
// @route   GET /api/commissions
const getCommissions = asyncHandler(async (req, res) => {
  const commissions = await Commission.find().populate({
    path: 'booking',
    populate: ['listing', 'buyer', 'owner'],
  });
  res.json(commissions);
});

module.exports = { completeDealWithCommission, getCommissions };
