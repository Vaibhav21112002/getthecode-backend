const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
    default:"User"
  }
});

module.exports = mongoose.model("User", UserSchema);
