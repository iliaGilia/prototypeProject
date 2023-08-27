import React, { useState } from 'react';
import '../../OurStyles/LoginCSS/LoginPage.css';  // Import your CSS file for styling
import axios from 'axios';
import { Link } from 'react-router-dom';


const API_URL = 'http://localhost:8000';  // Replace with your backend URL

function RegistrationPage() {
    const [formData, setFormData] = useState({
      email: '',
      first_name: '',
      last_name: '',
      password: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(`${API_URL}/api/register/`, formData);
        console.log('Registration successful!', response.data);
        // Redirect or perform other actions after successful registration
      } catch (error) {
        console.error('Registration failed:', error);
      }
    };
  
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
        <p>
        Already have an account?{' '}
        <Link to="/login">Login here</Link> {/* Link to the login page */}
      </p>
      </div>
    );
  }
  
  export default RegistrationPage;