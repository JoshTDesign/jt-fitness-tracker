const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const path = require("path");


const PORT = process.env.PORT || 3000;

//import the model folder TODO: create model folder
const db = require("./models");

const app = express();

app.use(logger("dev"));

//connect to the mongo database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessdb", { useNewUrlParser: true });

//route for index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

//route for 'new workout'
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

//route for 'continue workout'
app.get("/exercise/:id", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

//route for 'dashboard'
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});









// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });