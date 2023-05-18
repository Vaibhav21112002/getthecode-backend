const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/login");
const {
    getAllProblems,
    getOneProblem,
    getBySubString,
    createOneProblem,
    updateOneProblem,
    deleteOneProblem,
} = require("../controllers/problem-ctrl");

router.get("/",getAllProblems);
router.get("/:id", getOneProblem);
router.post("/search/all", getBySubString);
router.post("/",fetchUser, createOneProblem);
router.put("/:id",fetchUser, updateOneProblem);
router.delete("/:id",fetchUser, deleteOneProblem);

module.exports = router;
