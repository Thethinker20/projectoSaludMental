const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId; 

// User's Atributes
const consultSchema = new Schema({
  citation: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastNameM: {
    type: String,
  },
  lastNameP: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  motivConsult: {
    type: String,
    required: true,
  },
  evaSalud: {
    type: String,
    required: true,
  },
  soluProb: {
    type: String,
    required: true,
  },
  cita: {
    type: [String],
    required: false,
  },
  comentarios: {
    type: [String],
    required: false,
  },
  pagos: {
    type: [String],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Consult = mongoose.model("Consults", consultSchema);
