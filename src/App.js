import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Product from './pages/Product';
import About from './pages/About';
import Support from './pages/Support';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Register from './pages/Register'; // Register 페이지 import
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/register" element={<Register />} /> {/* Register 페이지 라우트 추가 */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;