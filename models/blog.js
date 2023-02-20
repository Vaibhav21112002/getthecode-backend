const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  keywords: { type: String, required: true },
  tag: { type: String, required: true },
  company: { type: String },
});

module.exports = mongoose.model("Blog", blogSchema);
