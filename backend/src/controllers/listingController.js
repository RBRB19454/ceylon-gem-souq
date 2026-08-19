const asyncHandler = require('express-async-handler');
const Listing = require('../models/Listing');

// @desc    Owner creates a new listing (goes in as 'pending')
// @route   POST /api/listings
const createListing = asyncHandler(async (req, res) => {
  if (!req.user.isVerified) {
    res.status(403);
    throw new Error('Your account must be verified by an administrator before you can submit gemstone listings.');
  }

  const listing = await Listing.create({
    ...req.body,
    owner: req.user._id,
    status: 'pending',
  });
  res.status(201).json(listing);
});

// @desc    Public/buyer: browse approved listings, with optional filters
// @route   GET /api/listings?gemType=sapphire&minPrice=100&maxPrice=5000
const getListings = asyncHandler(async (req, res) => {
  const { gemType, minPrice, maxPrice, certifiedOnly } = req.query;
  const filter = { status: 'approved' };

  if (gemType) filter.gemType = gemType;
  if (minPrice || maxPrice) {
    filter.priceUSD = {};
    if (minPrice) filter.priceUSD.$gte = Number(minPrice);
    if (maxPrice) filter.priceUSD.$lte = Number(maxPrice);
  }
  if (certifiedOnly === 'true') {
    filter['certification.issuer'] = { $exists: true, $ne: '' };
  }

  const listings = await Listing.find(filter).populate('owner', 'name');
  res.json(listings);
});

// @desc    Get a single listing by id
// @route   GET /api/listings/:id
const getListingById = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate('owner', 'name email');
  if (!listing) {
    res.status(404);
    throw new Error('Listing not found');
  }
  res.json(listing);
});

// @desc    Owner: view own listings (any status)
// @route   GET /api/listings/mine
const getMyListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ owner: req.user._id });
  res.json(listings);
});

// @desc    Owner: update own listing (re-enters 'pending' for re-approval)
// @route   PUT /api/listings/:id
const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(404);
    throw new Error('Listing not found');
  }
  if (listing.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this listing');
  }

  Object.assign(listing, req.body);
  listing.status = 'pending';
  await listing.save();
  res.json(listing);
});

// @desc    Admin: approve or reject a listing
// @route   PUT /api/listings/:id/review   body: { status: 'approved' | 'rejected' }
const reviewListing = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['approved', 'rejected'].includes(status)) {
    res.status(400);
    throw new Error("Status must be 'approved' or 'rejected'");
  }

  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(404);
    throw new Error('Listing not found');
  }

  listing.status = status;
  await listing.save();
  res.json(listing);
});

// @desc    Admin: view all listings regardless of status
// @route   GET /api/listings/admin/all
const getAllListingsAdmin = asyncHandler(async (req, res) => {
  const listings = await Listing.find().populate('owner', 'name email');
  res.json(listings);
});

module.exports = {
  createListing,
  getListings,
  getListingById,
  getMyListings,
  updateListing,
  reviewListing,
  getAllListingsAdmin,
};
