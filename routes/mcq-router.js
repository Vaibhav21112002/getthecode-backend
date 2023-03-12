const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/login")

const {
	getMcqs,
	getMcq,
	createMcq,
	updateMcq,
	deleteMcq,
} = require("../controllers/mcq-ctrl");

router.get("/",fetchUser, getMcqs);
router.get("/:id",fetchUser, getMcq);
router.post("/", fetchUser,createMcq);
router.put("/:id",fetchUser, updateMcq);
router.delete("/:id",fetchUser,deleteMcq);

module.exports = router;
