import React from 'react';
import { AuthProvider } from './pages/Login/AuthContext';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import Dashboard from './pages/Graphes/Dashboard';
import ProfilePage from './pages/Profile/ProfilePage';
import RegistrationPage from './pages/Login/RegistrationPage';
import './OurStyles/App.scss';



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
                                <NavLink to="/dashboard">Dashboard</NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile">Profile</NavLink>
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
                        <Route path="/profile" element={<ProfilePage />}/>
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
