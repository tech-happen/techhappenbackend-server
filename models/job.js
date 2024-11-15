const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
   recruiterId: { type : mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   title: String,
   description: String,
   type: { type: String, enum: ['Remote','Onsite','Hybrid'] },
   duration: { type: String, enum: ['Full-Time','Part-Time','Contract'] },
   hirePeriod: String,
   rate: String,
   price: Number,
 

});