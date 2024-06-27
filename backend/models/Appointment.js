const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  date: { type: Date, required: true },
  description: String,
});
module.exports = mongoose.model('Appointment', AppointmentSchema);
