import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Login/AuthContext';

const API_URL = 'http://localhost:8000';

const ProfilePage = () => {
  const { authToken } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/get_authenticated_user/`, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the token in the Authorization header 
          }
        });
        setUser(response.data);
        console.log('Auth data:', response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    console.log('Auth Token:', authToken);
    
    if (authToken) {
      fetchUserData(); // Only fetch user data if the token exists
    }
  }, [authToken]); // Re-fetch data when the token changes

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {user.email}</p>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <p>Date Joined: {user.date_joined}</p>
    </div>
  );
};

export default ProfilePage;