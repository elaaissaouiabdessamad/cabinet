import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { FaUser, FaLock } from 'react-icons/fa'; // Import icons from react-icons library

function Login({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here.
    if (username === 'admin' && password === 'admin') {
      login();
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <img src="logo.png" alt="Logo" className="login-logo" />
        <div className="form-group">
          <span className="icon">
            <FaUser />
          </span>
          <input 
            type="text" 
            placeholder="Identifiant" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <span className="icon">
            <FaLock />
          </span>
          <input 
            type="password" 
            placeholder="Mot de passe" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="login-button">Connexion</button>
        <button type="button" className="forgot-password-button">Mot de passe oublié</button>
      </form>
    </div>
  );
}

export default Login;
