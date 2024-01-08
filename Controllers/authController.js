import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import gravatar from 'gravatar';

const signUp = async (req, res) => {
  const { name, username, email, phone, password, confirmpassword, picture } =
    req.body;
  try {
    // check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    // create avatar for user
    const avatar = normalize(
      gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      }),
      { forceHttps: true }
    );

    
    const error = [];

    if (!username) {
      error.push("Please provide your user name");
    }
    if (!email) {
      error.push("Please provide your Email");
    }
    if (email && !validator.isEmail(email)) {
      error.push("Please provide your Valid Email");
    }
    if (!password) {
      error.push("Please provide your Password");
    }
    if (!confirmpassword) {
      error.push("Please provide your confirm Password");
    }
    if (password && confirmpassword && password !== confirmpassword) {
      error.push("Your Password and Confirm Password not same");
    }

    const alreadyExist = await User.findOne({ email, phone });

    if (alreadyExist) {
      error.push("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      phone,
      picture,
    });
    await newUser.save();

    const payload = { username };

    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: process.env.ExpiresIn,
    });

    res.cookie("authToken", token);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: { username, token },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Registartion Error",
      error: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      throw new Error("Enter the username");
    }
    if (!password) {
      throw new Error("Enter the password");
    }

    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User with this username doesn't exist");
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new Error("Incorrect Password");
    }

    const payload = { username };

    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: process.env.ExpiresIn,
    });

    res.cookie("authToken", token);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: { username, token },
    });
  } catch (error) {
    return res.status(402).json({
      success: false,
      message: "Login Error",
      error: error.message,
    });
  }
};

export { signUp, login };
