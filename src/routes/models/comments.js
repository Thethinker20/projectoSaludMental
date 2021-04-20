const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User's Atributes
const commentSchema = new Schema({
  comentario: {
    type: String,
    required: 'Please enter a comment',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Commentas = mongoose.model("Comments", commentSchema);