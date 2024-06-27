import React, { useState, useEffect } from 'react';
import { getPatients, deletePatient } from '../services/patientService';
import { Link } from 'react-router-dom';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const { data } = await getPatients();
    setPatients(data);
  };

  const handleDelete = async (id) => {
    await deletePatient(id);
    fetchPatients();
  };

  return (
    <div className="container">
      <h2>Patients</h2>
      <Link to="/patients/new" className="btn btn-primary mb-3">Add Patient</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.address}</td>
              <td>
                <Link to={`/patients/${patient._id}`} className="btn btn-info mr-2">Edit</Link>
                <button onClick={() => handleDelete(patient._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
