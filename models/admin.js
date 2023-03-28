const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  number: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  otp:{
    type:Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role:{
    type:String,
    default:"Admin"
  }
});

module.exports = mongoose.model("Admin", AdminSchema);
