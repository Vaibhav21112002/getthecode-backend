const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/login");
const {
  getAllSqls,
  getOneSql,
  createOneSql,
  updateOneSql,
  deleteOneSql,
} = require("../controllers/sql-ctrl");

router.get("/", fetchUser, getAllSqls);
router.get("/:id", fetchUser, getOneSql);
router.post("/", fetchUser, createOneSql);
router.put("/:id", fetchUser, updateOneSql);
router.delete("/:id", fetchUser, deleteOneSql);

module.exports = router;
