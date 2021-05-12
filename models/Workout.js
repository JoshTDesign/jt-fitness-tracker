const mongoose = require("mongoose");

const Schema = mongoose.Schema;


//TODO: update this model
const UserSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
