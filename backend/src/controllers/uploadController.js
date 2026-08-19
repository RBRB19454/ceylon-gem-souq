const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary');

// Wraps Cloudinary's stream-based upload API in a Promise so it can be awaited.
const streamUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `ceylon-gem-souq/${folder}`,
        // Keeps uploaded photos to a sane max size and caps file weight —
        // buyers browsing on mobile data in the Gulf shouldn't wait on
        // multi-megabyte gem photos.
        transformation: [{ width: 1600, height: 1600, crop: 'limit', quality: 'auto' }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

// @desc    Upload one or more images (gem photos, or a site logo)
// @route   POST /api/upload/image  (multipart/form-data, field name: "images")
//          optional field "folder" — "listings" (default) or "branding"
// @access  Private (owner or admin)
const uploadImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('No image files were uploaded');
  }

  // Only admins may write to the branding folder — an owner sending
  // folder=branding would otherwise be able to overwrite site assets.
  const requestedFolder = req.body.folder === 'branding' && req.user.role === 'admin' ? 'branding' : 'listings';

  const results = await Promise.all(req.files.map((file) => streamUpload(file.buffer, requestedFolder)));
  const urls = results.map((r) => r.secure_url);

  res.status(201).json({ urls });
});

module.exports = { uploadImages };
