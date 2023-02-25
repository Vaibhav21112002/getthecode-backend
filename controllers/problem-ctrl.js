const Problem = require("../models/problem");

// Get All Problems
module.exports.getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get One Problem
module.exports.getOneProblem = async (req, res) => {
    const { id } = req.params;
    try {
        const problem = await Problem.findById(id);
        res.status(200).json(problem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create One Problem
module.exports.createOneProblem = async (req, res) => {
    const {
        title,
        description,
        difficulty,
        topicTag,
        companyTag,
        hints,
        score,
        testCases,
        solution,
        language,
        videoLink,
        date,
    } = req.body;
    const newProblem = new Problem({
        title,
        description,
        difficulty,
        topicTag,
        companyTag,
        hints,
        score,
        testCases,
        solution,
        language,
        videoLink,
        date,
    });
    console.log(newProblem);
    try {
        const problem = await newProblem.save();
        res.status(201).json(problem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update One Problem
module.exports.updateOneProblem = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        difficulty,
        topicTag,
        companyTag,
        hints,
        score,
        testCases,
        solution,
        language,
        videoLink,
        date,
    } = req.body;
    try {
        const problem = await Problem.findById(id);
        if (title) problem.title = title;
        if (description) problem.description = description;
        if (difficulty) problem.difficulty = difficulty;
        if (topicTag) problem.topicTag = topicTag;
        if (companyTag) problem.companyTag = companyTag;
        if (hints) problem.hints = hints;
        if (score) problem.score = score;
        if (testCases) problem.testCases = testCases;
        if (solution) problem.solution = solution;
        if (language) problem.language = language;
        if (videoLink) problem.videoLink = videoLink;
        if (date) problem.date = date;
        const updatedProblem = await problem.save();
        res.status(200).json(updatedProblem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete One Problem
module.exports.deleteOneProblem = async (req, res) => {
    const { id } = req.params;
    try {
        const problem = await Problem.findById(id);
        await problem.remove();
        res.status(200).json({ message: "Problem Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
