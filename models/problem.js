const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    topicTag: {
        type: [String],
        required: true,
    },
    companyTag: {
        type: [String],
        required: true,
    },
    hints: {
        type: [String],
        required: true,
    },
    testCases: {
        type: [
            {
                input: {
                    type: String,
                    required: true,
                },
                output: {
                    type: String,
                    required: true,
                },
                hidden: {
                    type: Boolean,
                    required: true,
                },
                maxTimeLimit: {
                    type: Number,
                    required: true,
                },
            },
        ],
        required: true,
    },
    solution: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
        default: "Java",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Problem", problemSchema);
