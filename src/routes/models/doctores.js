/*const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId; 

// User's Atributes
const doctorsSchema = new Schema({
  docUsername: {
    type: String,
    required: true,
  },
  docPass: {
    type: String,
    required: true,
  },
  docPassConfirm: {
    type: String,
    required: true,
  },
  docNombre: {
    type: String,
    required: true,
  },
  docPaterno: {
    type: String,
    required: true,
  },
  docMaterno: {
    type: String,
  },
  docEmail: {
    type: String,
    required: true,
  },
  docPuesto: {
    type: String,
    required: true,
  },
  pasientes: {
    type: [ObjectId],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Doctores = mongoose.model("Doctores", doctorsSchema);*/