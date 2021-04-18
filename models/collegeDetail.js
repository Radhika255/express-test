const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  collegeName: String,
  courseName: String,
  status: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

module.exports = mongoose.model('collegedetails', CollegeSchema)