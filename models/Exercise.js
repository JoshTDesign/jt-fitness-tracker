const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: String,
  name: String,
  distance: Number,
  duration: Number,
  weight: Number,
  sets: Number,
  reps: Number
});


// This creates our model from the above schema, using mongoose's model method
const Exercise = mongoose.model("Exercise", ExerciseSchema);

// Export the User model
module.exports = Exercise;

