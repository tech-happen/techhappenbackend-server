const asyncHandler = require("express-async-handler");
const passport = require("passport");
const USERS = require("../models/waitinglist");

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

module.exports = { facebookLogin, facebookCallback };
