const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { notifyAdminsNewRegistration } = require('../utils/sendEmail');

// @desc    Register a new user (buyer or owner; admin accounts are created manually)
// @route   POST /api/auth/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone, preferredLanguage } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email, and password are required');
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters');
  }

  // Normalize to match how the schema stores email (lowercase) — otherwise
  // a differently-cased duplicate slips past this check and crashes below
  // on MongoDB's unique index instead of returning a clean message.
  const normalizedEmail = String(email).toLowerCase().trim();

  const userExists = await User.findOne({ email: normalizedEmail });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  try {
    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: role === 'admin' ? 'buyer' : role, // prevent self-registering as admin
      phone,
      preferredLanguage,
    });

    // Notify administrators of new user registration
    notifyAdminsNewRegistration(user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      preferredLanguage: user.preferredLanguage,
      isVerified: user.isVerified,
      token: generateToken(user._id),
    });
  } catch (err) {
    // Safety net: if two requests race past the findOne check above at the
    // same instant, Mongo's unique index still catches it — surface that
    // as a clean 400 instead of a raw duplicate-key crash.
    if (err.code === 11000) {
      res.status(400);
      throw new Error('User already exists');
    }
    // Any other schema validation failure (bad email format, etc.) becomes
    // a readable message instead of a generic 500.
    if (err.name === 'ValidationError') {
      res.status(400);
      throw new Error(Object.values(err.errors).map((e) => e.message).join(', '));
    }
    throw err;
  }
});

// @desc    Login user
// @route   POST /api/auth/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: String(email).toLowerCase().trim() });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      preferredLanguage: user.preferredLanguage,
      isVerified: user.isVerified,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get logged-in user's profile
// @route   GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, getMe };
