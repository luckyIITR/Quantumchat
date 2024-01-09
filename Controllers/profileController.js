import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { validationResult } from "express-validator";
import generateToken from "../Config/generateToken.js";
import normalize from "normalize-url";

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
const updateProfile = async (req, res) => {

    const { name, email, phone, picture, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const profileFields = {
        name : name,
        email : email,
        phone : phone,
        picture : picture,
        password : hashedPassword
    }

    res.status(200).json({})
};

export { profile, updateProfile };
