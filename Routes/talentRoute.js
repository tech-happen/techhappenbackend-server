const express = require('express');
const {createProfile, getProfile} = require('../controllers/talentController');
const authenticate = require('../middleware/authMiddleware');

// const router = require('express').Router();
const router = express.Router();


router.post('/profile', authenticate, createProfile);
router.get('/profile/:id', authenticate, getProfile);


module.exports = router;