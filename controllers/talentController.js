const Talent = require('../models/talentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const saltRounds = 10;


const registerTalent = async (req, res) => {
   try {
    const { fullName, email, password, dob, gender, nationality, experienceLevel, location, linkedIn, highestQualification, currentStaus, talentRole, portfolioLink, priceRange} = req.body;
    const existingTalent = await Talent.findOne({ email: email});

    if (existingTalent) {
      return res.status(409).json({ message: 'Talent already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const talent = new Talent({
      fullName, 
      email, 
      password:hashedPassword,
      dob, 
      gender,
      nationality,
      location, 
      linkedIn, 
      highestQualification, 
      currentStaus, 
      talentRole, 
      portfolioLink, 
      priceRange,
      approved: false,
      onWaitingList: true
    });

    await talent.save();

    res.status(201).json({ message: 'Registration successful. You will receive a confirmation email once your profile is approved.' });
   } catch (error) {
      console.log(error);
    res.status(500).json({ message:"Internal server error" });
   }
};

module.exports = registerTalent;