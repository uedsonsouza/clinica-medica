import React, { useState, useEffect } from 'react';
import { getAppointments, deleteAppointment } from '../services/appointmentService';
import { Link } from 'react-router-dom';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const { data } = await getAppointments();
    setAppointments(data);
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    fetchAppointments();
  };

  return (
    <div className="container">
      <h2>Appointments</h2>
      <Link to="/appointments/new" className="btn btn-primary mb-3">Add Appointment</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.patient.name}</td>
              <td>{new Date(appointment.date).toLocaleString()}</td>
              <td>{appointment.description}</td>
              <td>
                <Link to={`/appointments/${appointment._id}`} className="btn btn-info mr-2">Edit</Link>
                <button onClick={() => handleDelete(appointment._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
