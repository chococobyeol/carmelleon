import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Product from './pages/Product';
import About from './pages/About';
import Support from './pages/Support';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Register from './pages/Register';
import Login from './pages/Login';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const query = useQuery();

  useEffect(() => {
    const token = query.get('token');
    if (token) {
      localStorage.setItem('userToken', token);
      setIsLoggedIn(true);
      // 토큰을 URL에서 제거
      window.history.replaceState({}, document.title, '/');
    }
  }, [query]);

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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