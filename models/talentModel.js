const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const talentSchema = new Schema({
   fullName: {type : String, required: true},
   email: {type: String, required: true, unique: true},
   password: {type: String, required: true},
   dob : { type: Date, required: true},
   gender: {type: String, enum: ['male', 'female','other'], required: true},
   nationality: String,
   experienceLevel : {type: String, enum: ['entry-level','intermediate','senior','manager','director']},
   location :{ city: String, country: String},
   linkedIn : String,
   HighestQualification : String,
   currentStatus : {type: String, enum: ['student','employed','freelancer', 'recent graduate']},
   talentRole: String,
   portfolioLink : String,
   priceRange : String,
   cv: {type: String}, // file path for CV upload
   achievements: {
      completedProjects:{ type: Number, default: 0},
      reviews:{ type: Number, default: 0},
      rating:{ type: Number, default: 0}
   },
   availability: { type: Boolean, default: true},
   approved: { type: Boolean, default:false},
   onWaitingList : { type: Boolean, default: true},
},
{
timestamps: true,
versionKey: false
});

const Talent = mongoose.model('Talent', talentSchema);

module.exports = Talent;


