import asyncHandler from "express-async-handler"
import User from "../model/User.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// @desc Register a user
// @route POST /api/users/register
// @Access public
export const registerUser = asyncHandler(async (req, res)=>{
    const { username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400)
        throw new Error("User already registered");
    }
    // hash password
    const hashedPassword= await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    //console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({_id: user.id, email:user.email});
        
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    
})

// @desc Login a user
// @route POST /api/users/login
// @Access public
export const loginUser = asyncHandler(async (req, res)=>{

    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")   
    }
    
    const user = await User.findOne({email});
    // To compare password with hasedPassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.JWT_SECRET, {expiresIn: "5m"});
        res.status(200).json({accessToken});
    }
   else{
    res.status(400);
    throw new Error ("email or Password is not valid");
   }
})

//@desc current user info
// @route GET /api/users/current
// @Access private
export const currentUser = asyncHandler(async (req, res)=>{
    res.status(200).json("current")

}) 
