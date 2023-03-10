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

module.exports.getBySubString = async (req, res) => {
	const { topic } = req.body;
	if (!topic) {
		res.status(400).json({ message: "Invalid request" });
	}
	try {
		const problems = await Problem.find();
		const filteredProblems = [];
		for(let i = 0; i < problems.length; i++) {
			for(let j = 0; j < problems[i].topicTag.length; j++) {
				if(problems[i].topicTag[j].toLowerCase().includes(topic.toLowerCase())) {
					console.log(problems[i].topicTag[j].toLowerCase(), topic.toLowerCase());
					filteredProblems.push(problems[i]);
					break;
				}
			}
		}
		res.status(200).json(filteredProblems);
	} catch (error) {
		res.status(500).json({ message: error.message });
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

Problem.aggregate([
	{
		$unwind: "$topicTag",
	},
	{
		$group: {
			_id: "$topicTag",
			count: { $sum: 1 },
		},
	},
	{
		$group: {
			_id: null,
			totalQuestions: { $sum: 1 }, // count the total number of questions
			data: { $push: { label: "$_id", value: "$count" } },
		},
	},
	{
		$project: {
			_id: 0,
			labels: "$data.label",
			values: {
				$map: {
					input: "$data",
					as: "item",
					in: {
						$multiply: [
							{ $divide: ["$$item.value", "$totalQuestions"] },
							100,
						],
					},
				},
			},
		},
	},
]).exec(function (err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
		// data is an array with a single object in the following format:
		// [{ labels: ["topic tag 1", "topic tag 2", "topic tag 3"], values: [25, 50, 25] }]
	}
});
