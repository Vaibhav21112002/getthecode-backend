const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/login");

const {
	getBlogs,
	getBlog,
	createBlog,
	updateBlog,
	deleteBlog,
} = require("../controllers/blog-ctrl");

router.get("/",fetchUser, getBlogs);
router.get("/:id",fetchUser, getBlog);
router.post("/",fetchUser, createBlog);
router.put("/:id",fetchUser, updateBlog);
router.delete("/:id",fetchUser, deleteBlog);

module.exports = router;
