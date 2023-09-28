import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Login/AuthContext';
import AmazonPay from './AmazonPay';

const API_URL = 'http://localhost:8000';

const ProfilePage = () => {
  const { authToken } = useAuth();
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get(`${API_URL}/api/get_authenticated_user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log("byfdgysbiuj", response.data);
      setUser(response.data);
      console.log('Auth data:', response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    console.log('Auth Token:', authToken);

    if (authToken) {
      fetchUserData(); // Only fetch user data if the token exists
    }
  }, [authToken]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('profile_image', selectedImage);
  
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.post(`${API_URL}/api/upload_profile_image/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        // Refresh user data after the image upload
        fetchUserData();
        console.log('Image upload response:', response.data);
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }
  };

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
      {console.log('Profile Image URL:', user.profile_image)}
        <div>
          <h5>Profile Image</h5>
          <img
            src={API_URL+user.profile_image}
            style={{ maxWidth: '150px', maxHeight: '150px' }} 
          />
        </div>
      

      {/* Profile Image Upload Section */}
      <div>
        <h5>Add Profile Image</h5>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleImageUpload}>Upload</button>
      </div>

      <AmazonPay/>
    </div>
  );
};

export default ProfilePage;
