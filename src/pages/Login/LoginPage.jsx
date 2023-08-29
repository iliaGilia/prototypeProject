import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from './AuthContext';
import LoggedInImage from './LoggedInImage';
import '../../OurStyles/LoginCSS/LoginPage.css';  // Import your CSS file for styling
import axios from 'axios';
import { Link } from 'react-router-dom';
import HomePage from '../Home/HomePage';


const API_URL = 'http://localhost:8000';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoggedIn, login } = useAuth(); // Use the login function from context
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log('Logging in with:', email, password);
        try {
            const response = await axios.post(`${API_URL}/api/token/`, {
                email,
                password,
            });
            // console.log('API response:', response);
            // console.log('Response data:', response.data);
            // const success = response.data.success;
            // const access_token = response.data.access_token;
            // console.log('Success:', success);
            // if (success) {
            //     // Use the login function to set the user as authenticated
            //     login(access_token);
            //     navigate('/');
            // } else {
            //     console.error('Login failed:', response.data.message);
            // }
            const token = response.data.access_token; // Extract token from API response
            login(token); // Call the login function with the token
            navigate('/');
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
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                    <p>Don't have an account? <Link to="/registration">Register here</Link></p>
                </>
            )}
        </div>
    );
};

export default LoginPage;
