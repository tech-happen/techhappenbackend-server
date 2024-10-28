const asyncHandler = require('express-async-handler');
const WAITINGLIST = require("../models/waitinglist")

const joinwaitinglist = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email
    ) {
        throw Object.assign(new Error(`field can not be empty`), {
            status: 409
        })


    }
    const emailExist = await WAITINGLIST.findOne({ email: email })
    if (emailExist) {
        throw Object.assign(new Error(`Email already exist`), { status: 301 })
    }

    const joinedwaitinglist = await WAITINGLIST.create({
        email: email,
    })
    const token = generateToken(joinedwaitinglist._id)
    if (joinedwaitinglist) {
        res.status(202).header('Authorization', `Bearer ${token}`).json({
            ...joinedwaitinglist._doc
        })
    }
})

module.exports = { joinwaitinglist }