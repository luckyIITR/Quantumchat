import express from "express";
import { login, signUp } from "../Controllers/authController.js";
import { check, validationResult } from "express-validator";
const router = express.Router();

// @route    POST api/users
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


router.post("/login", login);

export default router;
