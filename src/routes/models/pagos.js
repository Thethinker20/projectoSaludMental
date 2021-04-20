const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId; 

// User's Atributes
const pagosSchema = new Schema({
  data: JSON,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Pagos = mongoose.model("Pagos", pagosSchema);
