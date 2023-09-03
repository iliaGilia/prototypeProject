import React, { useEffect, useState } from 'react';
import { useAuth } from '../Login/AuthContext';
import axios from 'axios'; // Import Axios

const ProfilePage = () => {
  const { isLoggedIn } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      // Make an authenticated API request to fetch user data using Axios
      axios
      .get('/api/profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response.data); // Log the entire response
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <div>Please log in to view your profile.</div>;
  }

  if (!user)
    return (
    <div>
      <h2>Your Profile</h2>
      <p>Email: {user.email}</p>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      {/* Add more profile information as needed */}
    </div>
  );
};

export default ProfilePage;
