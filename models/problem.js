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
    testCases:
    {
        type: [
            {
                input: { type: String },
                output: { type: String },
                explaination: { type: String }
            }
        ]
    },
    solution: {
        type: {
            java:{type:String},
            cpp:{type:String},
            python:{type:String}
        },
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
    link : {
        type: {
            gfg:{type:String},
            leetcode:{type:String},
            codeforces:{type:String},
            codechef:{type:String},
            interviewbit:{type:String},
        }
    }
});

module.exports = mongoose.model("Problem", problemSchema);
