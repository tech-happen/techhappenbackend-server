const mongoose = require("mongoose");
const WAITINGLIST = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "please add a your Email "],
        },

    },

    {
        timestamps: true,
    }
);
module.exports = mongoose.model("WAITINGLIST", WAITINGLIST);