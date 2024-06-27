const mongoose = require('mongoose');
const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: String,
});
module.exports = mongoose.model('Patient', PatientSchema);
