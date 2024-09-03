// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import mainIcon from '../assets/main_icon.png';
import homeIcon from '../assets/home_icon.png';
import productIcon from '../assets/product_icon.png';
import aboutIcon from '../assets/about_icon.png';
import supportIcon from '../assets/support_icon.png';
import cartIcon from '../assets/cart_icon.png';
import ordersIcon from '../assets/orders_icon.png';

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
        <img src={mainIcon} alt="Carmelleon" className="main-icon" />
        <h1>Carmelleon</h1>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">
              <div className="icon-container">
                <img src={homeIcon} alt="Home" className="icon" />
                <span>Home</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/product">
              <div className="icon-container">
                <img src={productIcon} alt="Product" className="icon" />
                <span>Product</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <div className="icon-container">
                <img src={aboutIcon} alt="About" className="icon" />
                <span>About</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/support">
              <div className="icon-container">
                <img src={supportIcon} alt="Support" className="icon" />
                <span>Support</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <div className="icon-container">
                <img src={cartIcon} alt="Cart" className="icon" />
                <span>Cart</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <div className="icon-container">
                <img src={ordersIcon} alt="Orders" className="icon" />
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