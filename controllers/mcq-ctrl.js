const MCQ = require("../models/mcq");

exports.getMcqs = async (req, res, next) => {
	try {
		const mcqs = await MCQ.find();
		res.status(200).json(mcqs);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.createMcq = async (req, res, next) => {
	const question = req.body.question;
	const options = req.body.options;
	const answer = req.body.answer;

	const mcq = new MCQ({
		question: question,
		options: options,
		answer: answer,
	});

	try {
		await mcq.save();
		res.status(201).json(mcq);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.getMcq = async (req, res, next) => {
	const id = req.params.id;
	try {
		const mcq = await MCQ.findById(id);
		if (!mcq) {
			const error = new Error("Could not find mcq.");
			error.statusCode = 404;
			throw error;
		}
		res.status(200).json(mcq);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.updateMcq = async (req, res, next) => {
	const id = req.params.id;
	const question = req.body.question;
	const options = req.body.options;
	const answer = req.body.answer;
	try {
		const mcq = await MCQ.findById(id);
		if (!mcq) {
			const error = new Error("Could not find mcq.");
			error.statusCode = 404;
			throw error;
		}
		mcq.question = question;
		mcq.options = options;
		mcq.answer = answer;
		const result = await mcq.save();
		res.status(200).json(result);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.deleteMcq = async (req, res, next) => {
	const id = req.params.id;
	try {
		const mcq = await MCQ.findById(id);
		if (!mcq) {
			const error = new Error("Could not find mcq.");
			error.statusCode = 404;
			throw error;
		}
		await MCQ.findByIdAndRemove(id);
		res.status(200).json({ message: "Deleted mcq." });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
