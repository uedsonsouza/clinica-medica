import React, { useState } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add state to track login error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ username, password });
      localStorage.setItem("token", data.token);
      navigate("/patients");
    } catch (error) {
      setError(
        "Falha no login. Verifique seu nome de usuário e senha e tente novamente.");

      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}{" "}
      {/* Display error message if login fails */}
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <br />
      <Link to="/" className="btn btn-secondary mb-3 ml-2">Cadastre-se gratuitamente</Link>
    </div>
  );
};

export default Login;
