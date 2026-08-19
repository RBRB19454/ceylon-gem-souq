const mongoose = require('mongoose');

// Deliberately a single-document collection: the site only ever has one
// set of "our company details," so there's no need for an id lookup —
// getSettings/updateSettings always operate on the one existing document
// (or create it on first save).
const SiteSettingsSchema = new mongoose.Schema(
  {
    logoUrl: { type: String, default: '' },
    supportEmail: { type: String, default: '' },
    qatarPhone: { type: String, default: '' },
    sriLankaPhone: { type: String, default: '' },
    qatarAddress: { type: String, default: '' },
    sriLankaAddress: { type: String, default: '' },
    facebookUrl: { type: String, default: '' },
    instagramUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    whatsappUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
