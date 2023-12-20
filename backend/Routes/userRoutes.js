// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate the role
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Forgot Password - Placeholder, actual implementation would involve email confirmation, etc.
// router.post('/forgot-password', (req, res) => {
//   // Implement your forgot password logic here
//   res.json({ message: 'Forgot Password functionality placeholder' });
// });

module.exports = router;
