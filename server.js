const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

// const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


//connect to the mongo database - boilerplate except for name of database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
    { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
    }
);



//route to post new workout
app.post("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});


//route for index.html
app.get("/", (req, res) => {
    res.send("workout time!")
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

//route for posting new workout
app.post("/api/workouts", (req, res) => {
    console.log(req.body);
    res.send(req.body);
    db.Workout.create(req.body)
        .then(dbWorkout => {
            console.log(dbWorkout);
        })
        .catch(({ message }) => {
            console.log(message);
        })
});





// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });