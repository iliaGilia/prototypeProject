import React from 'react';
import { AuthProvider } from './pages/Login/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import Dashboard from './pages/Graphes/Dashboard';
import RegistrationPage from './pages/Login/RegistrationPage';
import ProfilePage from './pages/Profile/ProfilePage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
