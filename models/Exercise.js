const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: String,
  duration: Number,
  distance: Number,
  weight: Number,
  reps: Number,
  sets: Number,
});


// This creates our model from the above schema, using mongoose's model method
const Exercise = mongoose.model("Exercise", ExerciseSchema);

// Export the User model
module.exports = Exercise;

