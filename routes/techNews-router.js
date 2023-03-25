const express = require("express");
const router = express.Router();

const {
	getAllTechNews,
	createTechNews,
	getTechNews,
	updateTechNews,
	deleteTechNews,
} = require("../controllers/techNews-ctrl");
const fetchUser = require("../middleware/login");

router.get("/", fetchUser, getAllTechNews);
router.post("/", createTechNews);
router.get("/:id", fetchUser, getTechNews);
router.put("/:id", updateTechNews);
router.delete("/:id", deleteTechNews);

module.exports = router;
