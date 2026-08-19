const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ['requested', 'accepted', 'declined', 'completed'],
      default: 'requested',
    },
    acceptedAt: { type: Date },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

bookingSchema.index({ buyer: 1, status: 1 });
bookingSchema.index({ owner: 1, status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
