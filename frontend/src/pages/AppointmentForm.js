import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createAppointment, getAppointment, updateAppointment } from '../services/appointmentService';
import { getPatients } from '../services/patientService';

const AppointmentForm = () => {
  const [patient, setPatient] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchPatients();
    if (id) {
      fetchAppointment();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPatients = async () => {
    const { data } = await getPatients();
    setPatients(data);
  };

  const fetchAppointment = async () => {
    const { data } = await getAppointment(id);
    setPatient(data.patient._id);
    setDate(new Date(data.date).toISOString().substring(0, 16));
    setDescription(data.description);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointment = { patient, date, description };

    if (id) {
      await updateAppointment(id, appointment);
    } else {
      await createAppointment(appointment);
    }
    navigate('/appointments');
  };

  return (
    <div className="container">
      <h2>{id ? 'Edit Appointment' : 'Add Appointment'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient</label>
          <select
            className="form-control"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            required
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="datetime-local"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
