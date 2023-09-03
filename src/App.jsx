import React from 'react';
import { AuthProvider } from './pages/Login/AuthContext';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import Dashboard from './pages/Graphes/Dashboard';
import RegistrationPage from './pages/Login/RegistrationPage';
import './OurStyles/App.scss';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';
import { css } from '@emotion/react';

function App() {
    return (
        <>
            <AuthProvider>
                <header>
                    <nav>
                        <a>
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/registration">Registration</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                            </li>
                        </ul>
                        </a>
                    </nav>
                </header>

                <br/> <br/> <br/>
                
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/registration" element={<RegistrationPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </main>

                <footer>
                    <p>Copyright © 2023 My Website</p>

                    <div className="footer-links">
                        <a href="/about">About</a>
                        <a href="/contact">Contact</a>
                        <a href="/terms">Terms</a>
                    </div>
                </footer>
            </AuthProvider>
        </>
    );
}

export default App;
