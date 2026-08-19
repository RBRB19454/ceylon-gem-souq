const express = require('express');
const router = express.Router();
const { uploadImages } = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/image', protect, authorize('owner', 'admin'), upload.array('images', 6), uploadImages);

module.exports = router;
