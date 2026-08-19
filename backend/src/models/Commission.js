const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true },
    buyerCommission: { type: Number, required: true },
    ownerCommission: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    markedCompleteBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Commission', commissionSchema);
