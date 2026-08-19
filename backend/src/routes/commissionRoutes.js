const express = require('express');
const router = express.Router();
const { completeDealWithCommission, getCommissions } = require('../controllers/commissionController');
const { protect, authorize } = require('../middleware/auth');

router.post('/complete', protect, authorize('admin'), completeDealWithCommission);
router.get('/', protect, authorize('admin'), getCommissions);

module.exports = router;
