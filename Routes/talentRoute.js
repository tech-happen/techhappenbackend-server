const express = require('express');
const registerTalent = require('../controllers/talentController');
// const router = require('express').Router();
const router = express.Router();


router.post('/register', registerTalent);


module.exports = router;