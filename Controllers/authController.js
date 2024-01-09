import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { validationResult } from "express-validator";
import generateToken from "../Config/generateToken.js";
import normalize from "normalize-url";

//@description     Register new user
//@route           POST /api/register/
//@access          Public
const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, picture, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const avatar = normalize(
      gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      }),
      { forceHttps: true }
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      phone,
      picture: avatar,
      password: hashedPassword,
    });

    await user.save();

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  } catch {
    res.status(500).send("Internal Server error");
  }
};

//@description     Auth the user
//@route           POST /api/login
//@access          Public
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Email" }] });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ errors: [{ msg: "Invalid Password" }] });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } catch {
    res.status(500).send("Internal Server error");
  }
};

export { signUp, login };
