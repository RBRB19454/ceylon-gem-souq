const asyncHandler = require('express-async-handler');
const SiteSettings = require('../models/SiteSettings');

const DEFAULTS = {
  logoUrl: '',
  supportEmail: 'info@ceylongemsouq.com',
  qatarPhone: '',
  sriLankaPhone: '',
  qatarAddress: 'West Bay, Doha, Qatar',
  sriLankaAddress: 'Colombo, Sri Lanka',
  facebookUrl: '',
  instagramUrl: '',
  linkedinUrl: '',
  whatsappUrl: '',
};

// @desc    Get current site settings (logo, contact info)
// @route   GET /api/settings
// @access  Public
const getSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.findOne();
  res.json(settings ? settings.toObject() : DEFAULTS);
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private (admin only)
const updateSettings = asyncHandler(async (req, res) => {
  const {
    logoUrl, supportEmail, qatarPhone, sriLankaPhone, qatarAddress, sriLankaAddress,
    facebookUrl, instagramUrl, linkedinUrl, whatsappUrl,
  } = req.body;

  const settings = await SiteSettings.findOneAndUpdate(
    {},
    {
      logoUrl, supportEmail, qatarPhone, sriLankaPhone, qatarAddress, sriLankaAddress,
      facebookUrl, instagramUrl, linkedinUrl, whatsappUrl,
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  res.json(settings);
});

module.exports = { getSettings, updateSettings };
