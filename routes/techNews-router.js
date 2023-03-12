const express = require("express");
const router = express.Router();

const {
	getAllTechNews,
	createTechNews,
	getTechNews,
	updateTechNews,
	deleteTechNews,
} = require("../controllers/techNews-ctrl");

router.get("/", getAllTechNews);
router.post("/", createTechNews);
router.get("/:id", getTechNews);
router.put("/:id", updateTechNews);
router.delete("/:id", deleteTechNews);

module.exports = router;
