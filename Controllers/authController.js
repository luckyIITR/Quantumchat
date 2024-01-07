import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import bcrypt from "bcrypt"
const signUp = async (req, res)=>{
    try {
        const {name, username, email, phone, password, picture} = req.body;
        if(!name || !username || !email || !phone || !password)
        {
            throw new Error("Enter Valid Credentials");
        }
        const alreadyExist = await User.findOne({email, phone})
        
        if(alreadyExist)
        {
            throw new Error("User already exist");
        }
        
        const hashedPassword=await bcrypt.hash(password, 10);

        const newUser = new User({name, username, email, password : hashedPassword, phone, picture});
        await newUser.save();

        const payload = {username};

        const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn : process.env.ExpiresIn});

        res.cookie("JWT", token);

        res.status(200).json({
            success : true,
            message : "Registration Successful",
            data : {username, token}
        })

    } catch (error) {
        return res.status(401).json({
            success : false,
            message : "Registartion Error",
            error : error.message
        }) 
    }
}

const login = async (req, res)=>{
    try {
        const {username, password} = req.body;

        if(!username)
        {
            throw new Error("Enter the username");
        }
        if(!password)
        {
            throw new Error("Enter the password");
        }

        const user = await User.findOne({username});
        if(!user)
        {
            throw new Error("User with this username doesn't exist");
        }
        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword)
        {
            throw new Error("Incorrect Password");
        }

        const payload = {username};

        const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn : process.env.ExpiresIn});

        res.cookie("JWT", token);

        res.status(200).json({
            success : true,
            message : "Login Successful",
            data : {username, token}
        })

    } catch (error) {
        return res.status(402).json({
            success : false,
            message : "Login Error",
            error : error.message
        })
    }
}

export {signUp, login} ;