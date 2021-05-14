const mongoose = require("mongoose");

const db = require("../models");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
     useNewUrlParser: true ,
     useUnifiedTopology: true
    });


const seed = async ()=>{
    const exercise1 = await db.Exercise.create({
      type: "cardio",
      name: "stairs",
      duration: 30,
      distance: 1
    })
    const exercise2 = await db.Exercise.create({
      type: "cardio",
      name: "treadmill",
      duration: 45,
      distance: 2
    })
    const exercise3 = await db.Exercise.create({
      type: "resistance",
      name: "curls",
      duration: 40,
      weight: 50,
      reps: 10,
      sets: 3
    })

    const workout1 = await db.Workout.create({
        day: new Date(new Date().setDate(new Date().getDate() - 2)),
        exercises:[exercise1._id,exercise2._id]
    })

    const workout2 = await db.Workout.create({
        day: new Date(new Date().setDate(new Date().getDate() - 1)),
        exercises:[exercise3._id]
    })
    console.log('seeded')
}

seed()