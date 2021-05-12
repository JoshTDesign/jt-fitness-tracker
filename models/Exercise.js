const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//TODO: Update these models
const NoteSchema = new Schema({
  title: String,
  body: String
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
