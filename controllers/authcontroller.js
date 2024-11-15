const asyncHandler = require("express-async-handler");
const passport = require("passport");
const WAITINGLIST = require("../models/waitinglist");
const USERS = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();

const saltRounds = 10;


const facebookLogin = passport.authenticate("facebook");

const facebookCallback = asyncHandler(async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      throw Object.assign(new Error(`Authentication failed`), { status: 401 });
    }
    const userExist = await WAITINGLIST.findOne({ facebookId: user.id });
    if (userExist) {
      throw Object.assign(new Error(`user exist`), { status: 401 });
    }
    const joinedUser = await USERS.create({
      facebookId: user.id,
      email: user.emails[0].value,
      displayName: user.displayName,
    });

    const token = generateToken(joinedUser._id);
    res.status(201).header("Authorization", `Bearer ${token}`).json({
      message: "User added to waiting list",
      user: joinedUser,
    });
  } catch (error) {
    throw Object.assign(new Error(`internal server error`), { status: 500 });
  }
});

const userSignup = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const existingUser = await USERS.findOne({ email: email });
    if(existingUser) {
      return res.status(400).json({message:'User already exists'});
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await USERS.create({
      fullName,
      email,
      password : hashedPassword,
      role
    });

    await newUser.save();

    return res.status(200).json({message:"user created successfully"});

  } catch (error) {
    console.log(error);
    return res.status(500).json({message:'internal server error'});
  }
};

const userLogin =async (req,res) =>{
  const {email, password} =req.body;
  try {
    const user = await USERS.findOne({email});
    if(!user){
    return res.status(400).json({message: 'user is not found!'})
    };

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
    return res.status(400).json({message:'invalid password'});
    }
   
    const token = jwt.sign({ userId : USERS.id}, process.env.JWT_SECRET, {expiresIn: process.env.expiresIn});
    res.status(200).json({token: token});

  } catch (error) {
    console.error(error);
    res.status(500).json({message:'something went wrong'});
  }
};

module.exports = { facebookLogin, facebookCallback, userSignup, userLogin};
