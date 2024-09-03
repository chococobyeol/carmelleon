// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn, userName, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login button clicked");
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google?mode=login`;
  };

  const handleSignUp = () => {
    console.log("Sign Up button clicked");
    navigate("/register");
  };

  return (
    <header className="header">
      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            <span className="user-name">{userName}</span>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/settings">
              <button>Account Settings</button>
            </Link>
          </>
        ) : (
          <>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignUp}>Sign Up</button>
          </>
        )}
      </div>
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/Assets/main_icon.png`} alt="Carmelleon" className="main-icon" />
        <h1>Carmelleon</h1>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">
              <div className="icon-container">
                <img src={`${process.env.PUBLIC_URL}/Assets/home_icon.png`} alt="Home" className="icon" />
                <span>Home</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/product">
              <div className="icon-container">
                <img src={`${process.env.PUBLIC_URL}/Assets/product_icon.png`} alt="Product" className="icon" />
                <span>Product</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <div className="icon-container">
                <img src={`${process.env.PUBLIC_URL}/Assets/about_icon.png`} alt="About" className="icon" />
                <span>About</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/support">
              <div className="icon-container">
                <img src={`${process.env.PUBLIC_URL}/Assets/support_icon.png`} alt="Support" className="icon" />
                <span>Support</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <div className="icon-container">
                <img src={`${process.env.PUBLIC_URL}/Assets/cart_icon.png`} alt="Cart" className="icon" />
                <span>Cart</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <div className="icon-container">
                <img src={`${process.env.PUBLIC_URL}/Assets/orders_icon.png`} alt="Orders" className="icon" />
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