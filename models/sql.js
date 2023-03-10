const mongoose = require("mongoose");

const sqlSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tables: {
    type: [{ numRows: { type: Number }, numCols: { type: Number },name:{type:String},tableData:{type:[[String]]} }],
  },
  difficulty: {
    type: String,
    required: true,
  },
  companyTag: {
    type: [String],
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },

  solution: { type: String, required: true },
  videoLink: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SQL", sqlSchema);
