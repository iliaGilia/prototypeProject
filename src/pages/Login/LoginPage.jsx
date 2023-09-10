import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HomePage from '../Home/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:8000';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, login, authToken } = useAuth(); // Use the login function and authToken from context
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log('Logging in with:', email, password);
    try {
      const response = await axios.post(`${API_URL}/api/token/`, {
        email,
        password,
      });

      console.log('API response:', response);

      const success = response.data.success;
      const access_token = response.data.access_token;

      console.log('Success:', success);

      if (success) {
        // Save the access_token to local storage
        localStorage.setItem('authToken', access_token);

        // Call the login function from the context to set the authToken
        login(access_token);

        // Redirect the user to the home page after successful login
        navigate('/profile');
      } else {
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <HomePage />
      ) : (
        <>
          <h1>Login</h1>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} className="btn btn-primary">
            Login
          </button>
          <p>
            Don't have an account? <Link to="/registration">Register here</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default LoginPage;
