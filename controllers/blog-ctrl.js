const Blog = require("../models/blog");

exports.getBlogs = async (req, res, next) => {
	try {
		const blogs = await Blog.find();
		res.status(200).json(blogs);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.createBlog = async (req, res, next) => {
	const title = req.body.title;
	const content = req.body.content;
	const image = req.body.image;
	const tags = req.body.tags;
	const company = req.body.company ? req.body.company : "default";
	const blog = new Blog({
		title: title,
		content: content,
		image: image,
		tags: tags,
		company: company,
	});

	try {
		await blog.save();
		res.status(201).json(blog);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.getBlog = async (req, res, next) => {
	const { id } = req.params;
	console.log(id);
	try {
		const blog = await Blog.find({
			_id: id,
		});
		console.log(blog);
		if (!blog) {
			res.status(404).json({ message: "Blog not found!" });
		}
		res.status(200).json(blog);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.updateBlog = async (req, res, next) => {
	const id = req.params.id;
	const title = req.body.title;
	const content = req.body.content;
	const image = req.body.image;
	const tags = req.body.tags;
	const company = req.body.company ? req.body.company : "default";

	try {
		const blog = await Blog.findById(id);
		if (!blog) {
			res.status(404).json({ message: "Blog not found!" });
		}

		blog.title = title;
		blog.content = content;
		blog.image = image;
		blog.tags = tags;

		const result = await blog.save();
		res.status(200).json(result);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.deleteBlog = async (req, res, next) => {
	const id = req.params.id;

	try {
		const blog = await Blog.findById(id);
		if (!blog) {
			const error = new Error("Could not find blog.");
			error.statusCode = 404;
			throw error;
		}
		await Blog.findByIdAndRemove(id);
		res.status(200).json({ message: "Blog deleted." });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};