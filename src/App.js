// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Product from './pages/Product';
import About from './pages/About';
import Support from './pages/Support';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Register from './pages/Register';
import Login from './pages/Login';
import Settings from './pages/Settings';
import UserList from './pages/UserList';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const token = query.get('token');
    if (token) {
      localStorage.setItem('userToken', token);
      setIsLoggedIn(true);
      fetchUserInfo(token);
      navigate('/');
    }
  }, [query, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('http://localhost:3001/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUserInfo(userData);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate('/');
  };

  return (
    <div className="App">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        userName={userInfo?.name} 
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings userInfo={userInfo} />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;