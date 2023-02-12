const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	image: { type: String, required: true },
	tags: {
		type: [String],
	},
	company: { type: String },
});

module.exports = mongoose.model("Blog", blogSchema);
