const express = require('express')
const { joinwaitinglist } = require('../controllers/waitinglist')
const Router = express.Router()


Router.route('/join-waiting-list').post(joinwaitinglist)


module.exports = Router 