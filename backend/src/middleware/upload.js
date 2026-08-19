const multer = require('multer');

// Memory storage: the file buffer stays in RAM just long enough to be
// streamed to Cloudinary — nothing is ever written to this server's disk.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per image
    files: 6, // a listing rarely needs more than a handful of photos
  },
});

module.exports = upload;
