const TechNews = require("../models/techNews");

exports.getAllTechNews = async (req, res, next) => {
	try {
		const techNews = await TechNews.find();
		res.status(200).json(techNews);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.createTechNews = async (req, res, next) => {
	const title = req.body.title;
	const content = req.body.content;
	const keywords = req.body.keywords;
	const tag = req.body.tag;
	const company = req.body.company ? req.body.company : "default";
	const image = req.body.image;
	const technews = new TechNews({
		title: title,
		content: content,
		keywords: keywords,
		tag: tag,
		company: company,
		image: image,
	});
	try {
		await technews.save();
		res.status(201).json(technews);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.getTechNews = async (req, res, next) => {
	const { id } = req.params;
	try {
		const techNews = await TechNews.find({
			_id: id,
		});
		if (!techNews) {
			res.status(404).json({ message: "News not found!" });
		}
		res.status(200).json(techNews);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.updateTechNews = async (req, res, next) => {
	const id = req.params.id;
	const title = req.body.title;
	const content = req.body.content;
	const keywords = req.body.keywords;
	const tags = req.body.tags;
	const company = req.body.company ? req.body.company : "default";
	const image = req.body.image;

	try {
		const techNews = await TechNews.findById(id);
		if (!techNews) {
			res.status(404).json({ message: "Blog not found!" });
		}

		techNews.title = title;
		techNews.content = content;
		techNews.keywords = keywords;
		techNews.tags = tags;
		techNews.company = company;
		techNews.image = image;

		const result = await techNews.save();
		res.status(200).json(result);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.deleteTechNews = async (req, res, next) => {
	const id = req.params.id;

	try {
		const techNews = await TechNews.findById(id);
		if (!techNews) {
			const error = new Error("Could not find techNews.");
			error.statusCode = 404;
			throw error;
		}
		await TechNews.findByIdAndRemove(id);
		res.status(200).json({ message: "News deleted." });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
