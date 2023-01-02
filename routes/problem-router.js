const express = require("express");
const router = express.Router();
const {
    getAllProblems,
    getOneProblem,
    createOneProblem,
    updateOneProblem,
    deleteOneProblem,
} = require("../controllers/problem-ctrl");

router.get("/", getAllProblems);
router.get("/:id", getOneProblem);
router.post("/", createOneProblem);
router.put("/:id", updateOneProblem);
router.delete("/:id", deleteOneProblem);

module.exports = router;
