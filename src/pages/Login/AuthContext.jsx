import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('jwtToken') || null); // Initialize authToken from local storage

  const login = (token) => {
    localStorage.setItem('jwtToken', token); // Store the token in localStorage
    setAuthToken(token); // Set the authToken in state
    setIsLoggedIn(true);
  
    console.log('Saved token is:', token); // Log the saved token
  };

  const logout = () => {
    localStorage.removeItem('jwtToken'); // Remove the token from localStorage
    setAuthToken(null); // Clear the authToken in state
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authToken, login, logout }}> {/* Include authToken in the value */}
      {children}
    </AuthContext.Provider>
  );
}
