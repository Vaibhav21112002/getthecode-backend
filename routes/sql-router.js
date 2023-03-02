const express = require("express");
const router = express.Router();

const {
	getAllSqls,
    getOneSql,
    createOneSql,
    updateOneSql,
    deleteOneSql

} = require("../controllers/sql-ctrl");

router.get("/", getAllSqls);
router.get("/:id", getOneSql);
router.post("/", createOneSql);
router.put("/:id", updateOneSql);
router.delete("/:id", deleteOneSql);

module.exports = router;
