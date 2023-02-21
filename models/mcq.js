const mongoose = require("mongoose");

const mcqSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	options: {
		type: [
			{
				no: {
					type: Number,
				},
				text: {
					type: String,
				},
				image: {
					type: String,
				},
			},
		],
		required: true,
	},
	answer: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Mcq", mcqSchema);
