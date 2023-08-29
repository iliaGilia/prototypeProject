import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Login/AuthContext';
const API_URL = 'http://localhost:8000'; 

const ProfilePage = () => {
    const { isLoggedIn, login } = useAuth(); // Use the login function from AuthContext
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            // Retrieve the token from local storage
            const authToken = localStorage.getItem('token');
            console.log('Token:', authToken); // Log the token to the console

            // Make the API request to fetch user profile data
            axios.get(`${API_URL}/api/profile/`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,  // Use 'Bearer' before the token
                },
            })
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
        }
    }, [isLoggedIn]);

    return (
        <div>
            <h1>User Profile</h1>
            {userData ? (
                <div>
                    <p>Email: {userData.email}</p>
                    <p>First Name: {userData.first_name}</p>
                    <p>Last Name: {userData.last_name}</p>
                    {/* Display other user data fields from the API */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfilePage;
