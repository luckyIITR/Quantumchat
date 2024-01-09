import express from "express";
import { check } from "express-validator";
const router = express.Router();
import auth from "../Middleware/auth.js";
import { profile, updateProfile } from "../Controllers/profileController.js";

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, profile);

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/updateprofile",
  auth,
  updateProfile
);

export default router;
