const mongoose = require("mongoose");
const USERS = mongoose.Schema(
    { 
        fullName: { type: String, required: true },
        email: { type: String, required: [true, "please add a your Email "],
        },
        password: { type: String, unique: true, required: true },
        facebookId: { type: String},
        role: { type: String, enum: ["Admin", "Talent","Recruiter"], required: true},
        isApproved: { type: Boolean, default: false}
    },

    {
        timestamps: true,
    }
);
module.exports = mongoose.model("USERS", USERS);