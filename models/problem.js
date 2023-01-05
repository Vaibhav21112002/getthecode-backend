const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    difficulty: {
        type: String,
    },
    topicTag: {
        type: [String],
    },
    companyTag: {
        type: [String],
    },
    hints: {
        type: {
            hint1: {
                type: String,
            },
            hint2: {
                type: String,
            },
            hint3: {
                type: String,
            },
            hint4: {
                type: String,
            },
            hint5: {
                type: String,
            },
        },
    },
    score: {
        type: Number,
    },
    testCases: {
        testCase1: {
            input: {
                type: String,
            },
            output: {
                type: String,
            },
            explanation: {
                type: String,
            },
        },
        testCase2: {
            input: {
                type: String,
            },
            output: {
                type: String,
            },
            explanation: {
                type: String,
            },
        },
    },
    solution: {
        type: String,
    },
    videoLink: {
        type: String,
    },
    language: {
        type: String,
        default: "Java",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Problem", problemSchema);
