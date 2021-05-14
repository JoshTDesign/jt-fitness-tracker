const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;


const app = express();

const path = require('path');


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

const db = require("./models");


//HOME ROUTES----------------------------------------

//route for index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"/public/index.html"));
});

//route for 'new workout'
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname,"/public/exercise.html"));
});


//route for 'dashboard'
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname,"/public/stats.html"));
    // res.send('testing stats');
});

//API ROUTES-------------------------------------------

//route for posting new workout
// app.post("/api/workouts", (req, res) => {
//     db.Workout.create({})
//     .then(newWorkout => {
//         res.json(newWorkout)
//     }).catch(err => {
//         res.status(500).json(err);
//     })
// });

//route for 'create new workout
// app.post("/api/workouts", async (req, res) => {
//     db.Workout.create({})
//     .then(newWorkout => {
//         res.json(newWorkout)
//     }).catch(err => {
//         res.status(500).json(err);
//     })
// });

app.post("/api/workouts", (req, res) => {
    db.Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

app.put("/api/workouts/:id", async (req, res) => {
    try {
      const response = await db.Workout.findByIdAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
      res.json(response);
    }
    catch (err) {
      console.log("error occurred while creating a workout:", err)
    }
  });




//route for posting new exercise
app.post('/api/workouts', async (req,res) => {
    try{
        const response = await db.Workout.create({type: "workout"})
        res.json(response);
    }
    catch(err){
        console.log("error occurred while creating a workout:", err)
    }
});

//route for getting all workouts
app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([{$addFields:{totalDuration: {$sum:"$exercises.duration"}}}])
    .then(workout => {
        res.json(workout)
    }).catch(err => {
        res.json(err);
    });
});


app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([{$addFields:{totalDuration: {$sum:"$exercises.duration"}}}]).sort({_id:-1}).limit(7)
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.json(err);
    });
}); 

//route for getting all exercises
app.get("/api/exercises", (req, res) => {
    db.Exercise.find().then(allExercises => {
        res.json(allExercises)
    }).catch(err=> {
        res.status(500).json(err);
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });