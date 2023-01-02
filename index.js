const db = require("./db/index");
const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const problemRouter = require("./routes/problem-router");


db();
dotenv.config();
const app = express();
app.use(
    bodyParser.json({
        limit: "30mb",
        extended: true,
    })
);
app.use(
    bodyParser.urlencoded({
        limit: "30mb",
        extended: true,
    })
);

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("Status Ok!");
});

app.use("/api/problems", problemRouter);
app.listen(PORT, () => {
    console.log(
        chalk.blue(`Server is running on port http://localhost:${PORT}/`)
    );
});
