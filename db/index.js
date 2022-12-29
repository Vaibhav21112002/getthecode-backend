const mongoose = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();
const URI = process.env.MONGO_URI;

const connnect = (async) => {
    mongoose
        .connect(URI)
        .then(() => {
            console.log(chalk.blue("DB is connected"));
        })
        .catch((err) => {
            console.log(chalk.red("DB is not connected"));
        });
};

module.exports = connnect;
