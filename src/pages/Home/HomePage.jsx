import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext';
import '../../OurStyles/HomeCSS/HomePage.css';

const HomePage = () => {
    const { isLoggedIn } = useAuth();

    return (
        <div>
            <nav className="nav">
                <ul>
                    <li>
                    <Link to={isLoggedIn ? "/dashboard" : "/login"}>
                            {isLoggedIn ? 'Dashboard' : 'Login'}
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="header-home">
                <h1>Welcome to My Homepage</h1>
            </div>
            <main className="main-content">
                <p>This is a simple and nice-looking home page created using React.</p>
                <p>Feel free to customize and style it according to your preferences!</p>
            </main>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>fgfdgdfdfg<br></br><br></br><br></br><br></br>fdfdsfds
        </div>
    );
}

export default HomePage;
