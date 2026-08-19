const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    gemType: {
      type: String,
      enum: ['sapphire', 'catseye', 'moonstone', 'spinel', 'alexandrite', 'ruby', 'other'],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    weightCt: { type: Number, required: true },
    color: { type: String },
    clarity: { type: String },
    shape: { type: String },
    origin: { type: String, default: 'Sri Lanka' },
    certification: {
      issuer: { type: String },
      certNumber: { type: String },
      fileUrl: { type: String },
    },
    priceUSD: { type: Number, required: true },
    priceLKR: { type: Number },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'sold'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

listingSchema.index({ gemType: 1, status: 1 });
listingSchema.index({ priceUSD: 1 });

module.exports = mongoose.model('Listing', listingSchema);
