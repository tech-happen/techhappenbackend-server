const TalentProfile = require('../models/talentProfile');
const bcrypt = require('bcryptjs');


const saltRounds = 10;

const createProfile = async (req,res) =>{
  // const {userId,FullName,email,}

  try {
    const profile =new TalentProfile({userId : req.user.userId, ...req.body});
    await profile.save();
    return res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'internal server error'});
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await TalentProfile.findOne({userId: req.query.id});
    if(!profile) {
      return res.status(400).json({message: "Profile not found"});
    }
      res.status(200).json(profile);
  
  } catch (error) {
    console.error(error)
    res.status(500).json({message: "internal server error"});
  }
};

module.exports = {createProfile, getProfile};