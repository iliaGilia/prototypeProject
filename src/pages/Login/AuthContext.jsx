import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null); // Add authToken state

  const login = (token) => {
    localStorage.setItem('token', token); // Store the token in localStorage
    setAuthToken(token); // Set the authToken in state
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setAuthToken(null); // Clear the authToken in state
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authToken, login, logout }}> {/* Include authToken in the value */}
      {children}
    </AuthContext.Provider>
  );
}
