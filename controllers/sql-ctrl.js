const Sql = require("../models/sql");

// Get All Problems
module.exports.getAllSqls = async (req, res) => {
    try {
        const problems = await Sql.find();
        res.status(200).json(problems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get One Problem
module.exports.getOneSql = async (req, res) => {
    const { id } = req.params;
    try {
        const problem = await Sql.findById(id);
        res.status(200).json(problem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create One Problem
module.exports.createOneSql = async (req, res) => {
    const {
        title,
        description,
        tables,
        difficulty,
        companyTag,
        score,
        solution,
        videoLink,
        date
    } = req.body;
    
    const newSql = new Sql({
        title,
        description,
        tables,
        difficulty,
        companyTag,
        score,
        solution,
        videoLink,
        date
    });
    console.log(newSql);
    try {
        const sql = await newSql.save();
        res.status(201).json(sql);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update One Problem
module.exports.updateOneSql = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        tables,
        difficulty,
        companyTag,
        score,
        solution,
        videoLink,
        date
    } = req.body;
    console.log(req.body,"editing");
    try {
        const sql = await Sql.findById(id);
        if (title) sql.title = title;
        if (description) sql.description = description;
        if (difficulty) sql.difficulty = difficulty;
        if (companyTag) sql.companyTag = companyTag;
        if (tables) sql.tables = tables ;
        if (score) sql.score = score;
        if (solution) sql.solution = solution;
        if (videoLink) sql.videoLink = videoLink;
        if (date) sql.date = date;
        const updatedSql = await sql.save();
        res.status(200).json(updatedSql);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete One Problem
module.exports.deleteOneSql = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = await Sql.findById(id);
        await sql.remove();
        res.status(200).json({ message: "Problem Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
