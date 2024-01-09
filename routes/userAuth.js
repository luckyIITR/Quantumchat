import express from "express";
import { login, signUp } from "../Controllers/authController.js";
import { check } from "express-validator";
const router = express.Router();
import User from "../Models/User.js";
import auth from "../Middleware/auth.js"

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/signup
// @desc     Register user
// @access   Public
router.post(
  "/signup",
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  signUp
);


// @route    POST api/login
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/login",
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  login
);


export default router;
