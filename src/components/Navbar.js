import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="header">
      <div className="auth-buttons">
        <button>Login</button>
        <button>Sign Up</button>
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