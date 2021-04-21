const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

// User's Atributes
const commentSchema = new Schema({
  comentario: {
    type: String,
    required: 'Please enter a comment',
  },
  createdAt: {
    type: String,
    default: dateTime,
  },
});

module.exports = Commentas = mongoose.model("Comments", commentSchema);