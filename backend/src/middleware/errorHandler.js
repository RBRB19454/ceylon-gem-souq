const errorHandler = (err, req, res, next) => {
  // Multer throws its own error type for upload problems (wrong file type,
  // file too large, too many files). Without this, they'd fall through as
  // a generic 500 "Internal Server Error" instead of a clear 400.
  if (err.name === 'MulterError') {
    res.status(400);
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'Image is too large — please keep each file under 5MB.'
        : err.code === 'LIMIT_FILE_COUNT'
        ? 'Too many images — you can upload up to 6 at a time.'
        : err.message;
    return res.json({ message });
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };
