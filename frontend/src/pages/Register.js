import React, { useState } from 'react';
import { register } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add state for error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password });
      navigate('/login');
    } catch (error) {
      if (error.response) {
        // Check if the server sent a detailed error message
        const errorMessage = error.response.data.message || 'Ocorreu um erro durante o registro.';
        setError(errorMessage);
      } else {
        // For unexpected errors not related to the Axios request
        console.error(error);
        setError('Ocorreu um erro durante o registro.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message if any */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <br />
      <Link to="/login" className="btn btn-secondary mb-3 ml-2"> Já possui uma conta?</Link>
    </div>
  );
};

export default Register;