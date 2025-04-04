require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const jwtSecret = process.env.JWT_SECRET;

// Log to check if JWT_SECRET is loaded
console.log("JWT_SECRET:", jwtSecret);

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

// ROUTE 1 - Create a user using: POST "api/auth/createuser": no login required 
router.post(
  '/createuser',
  [
    body('name').isLength({ min: 3 }).withMessage('Enter a valid name'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // To check if the user with an email already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      // Create new user
      user = await User.create({
        name,
        email,
        password: secPass
      });

      const data = {
        user: {
          id: user.id
        }
      };
      success = true
      const authToken = jwt.sign(data, jwtSecret);
      res.json({ success,authToken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong.");
    }
  }
);

// ROUTE 2 - Authenticate a user using POST:"/api/auth/login"
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').exists().withMessage('Password cannot be blank')
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const data = {
        user: {
          id: user.id
        }
      };

      const authToken = jwt.sign(data, jwtSecret);
      success=true
      res.json({success, authToken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong.");
    }
  }
);

// ROUTE 3 - Get user details using POST: "/api/auth/getUser": login required
router.post('/getUser', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Something went wrong.");
  }
});

module.exports = router;
