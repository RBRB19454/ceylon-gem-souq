const express = require('express');
const router = express.Router();
const {
  createListing,
  getListings,
  getListingById,
  getMyListings,
  updateListing,
  reviewListing,
  getAllListingsAdmin,
} = require('../controllers/listingController');
const { protect, authorize } = require('../middleware/auth');

// Order matters: specific paths before the /:id catch-all
router.get('/mine', protect, authorize('owner'), getMyListings);
router.get('/admin/all', protect, authorize('admin'), getAllListingsAdmin);
router.get('/', getListings);
router.get('/:id', getListingById);

router.post('/', protect, authorize('owner'), createListing);
router.put('/:id', protect, authorize('owner'), updateListing);
router.put('/:id/review', protect, authorize('admin'), reviewListing);

module.exports = router;
