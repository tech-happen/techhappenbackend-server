const mongoose = require("mongoose");
const USERS = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "please add a your Email "],
        },
        facebookId: {
            type: String,
            required:[true, 'please add your facebook id']
        }

    },

    {
        timestamps: true,
    }
);
module.exports = mongoose.model("USERS", USERS);