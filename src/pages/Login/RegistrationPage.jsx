import React, { useState } from 'react';
import '../../OurStyles/LoginCSS/LoginPage.css';  // Import your CSS file for styling
import axios from 'axios';
import { Link } from 'react-router-dom';


const API_URL = 'http://localhost:8000';  // Replace with your backend URL

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const handleRegister = async () => {
        try {
            // Make a POST request to your registration API endpoint
            const response = await axios.post(`${API_URL}/api/register/`, {
                email,
                password,
            });
            // Handle successful registration (redirect, show a message, etc.)
        } catch (error) {
            // Handle error, show error message to the user
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

export default RegistrationPage;
