import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogin = () => {
    console.log("Login button clicked");
    window.location.href = "http://localhost:3001/auth/google";  
    };

  const handleSignUp = () => {
    console.log("Sign Up button clicked");
    window.location.href = "http://localhost:3001/auth/google"; 
    };
  const handleLogout = () => {
        console.log("Logout button clicked");
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        // 필요하다면 백엔드에 로그아웃 요청을 보낼 수 있습니다.
        // 예: window.location.href = "http://localhost:3001/auth/logout";
    };

    return (
        <header className="header">
            <div className="auth-buttons">
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <button onClick={handleLogin}>Login</button>
                        <button onClick={handleSignUp}>Sign Up</button>
                    </>
                )}
            </div>
            <div className="logo">
                <img src={`${process.env.PUBLIC_URL}/assets/main_icon.png`} alt="Carmelleon" className="main-icon" />
                <h1>Carmelleon</h1>
            </div>
            <nav className="navbar">
                <ul className="nav-links">
                    <li>
                        <Link to="/">
                            <div className="icon-container">
                                <img src={`${process.env.PUBLIC_URL}/assets/home_icon.png`} alt="Home" className="icon" />
                                <span>Home</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/product">
                            <div className="icon-container">
                                <img src={`${process.env.PUBLIC_URL}/assets/product_icon.png`} alt="Product" className="icon" />
                                <span>Product</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            <div className="icon-container">
                                <img src={`${process.env.PUBLIC_URL}/assets/about_icon.png`} alt="About" className="icon" />
                                <span>About</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/support">
                            <div className="icon-container">
                                <img src={`${process.env.PUBLIC_URL}/assets/support_icon.png`} alt="Support" className="icon" />
                                <span>Support</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart">
                            <div className="icon-container">
                                <img src={`${process.env.PUBLIC_URL}/assets/cart_icon.png`} alt="Cart" className="icon" />
                                <span>Cart</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders">
                            <div className="icon-container">
                                <img src={`${process.env.PUBLIC_URL}/assets/orders_icon.png`} alt="Orders" className="icon" />
                                <span>Orders</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;