const express = require("express");
const router = express.Router();

const {
	getMcqs,
	getMcq,
	createMcq,
	updateMcq,
	deleteMcq,
} = require("../controllers/mcq-ctrl");

router.get("/", getMcqs);
router.get("/:id", getMcq);
router.post("/", createMcq);
router.put("/:id", updateMcq);
router.delete("/:id", deleteMcq);

module.exports = router;
