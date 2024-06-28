import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPatient, getPatient, updatePatient } from '../services/patientService';

const PatientForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchPatient();
    }
  }, [id]);

  const fetchPatient = async () => {
    const { data } = await getPatient(id);
    setName(data.name);
    setAge(data.age);
    setAddress(data.address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patient = { name, age, address };

    if (id) {
      await updatePatient(id, patient);
    } else {
      await createPatient(patient);
    }
    navigate('/patients');
  };

  const handleLogout = () => {
    // Perform any logout logic here, e.g., clearing user data
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>{id ? 'Edit Patient' : 'Adicionar paciente'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Idade</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Endereco</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <br />
        <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </form>
    </div>
  );
};

export default PatientForm;