import React, { useState } from 'react';
import "./CSS/AdminLogin.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className='admin-login-container'>
      <div className='admin-login container'>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='email-div'>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='email-div'>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className='error'>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div> 
  );
}

export default AdminLogin;