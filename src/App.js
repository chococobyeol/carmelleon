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
import Settings from './pages/Settings';
import UserList from './pages/UserList';
import Popup from './components/Popup';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);
  const query = useQuery();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = query.get('token');
    const error = query.get('error');
    const googleId = query.get('googleId');
    const email = query.get('email');
    const name = query.get('name');

    if (token) {
      localStorage.setItem('userToken', token);
      setIsLoggedIn(true);
      fetchUserInfo(token);
      navigate('/', { replace: true });
    } else if (error === 'no_user' && googleId && email && name) {
      setPopupInfo({ googleId, email, name });
      setShowPopup(true);
    } else {
      setShowPopup(false);
      setPopupInfo(null);
    }
  }, [query, navigate, location]);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
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
    navigate('/', { replace: true });
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      if (response.ok) {
        handleLogout();
        alert('계정이 성공적으로 삭제되었습니다.');
      } else {
        const data = await response.json();
        alert(`계정 삭제 실패: ${data.message}`);
      }
    } catch (error) {
      console.error('계정 삭제 중 오류 발생:', error);
      alert('계정 삭제 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(popupInfo),
      });

      if (response.ok) {
        alert('회원가입이 완료되었습니다. 로그인 해주세요.');
        setShowPopup(false);
        setPopupInfo(null);
        // 회원가입 후 Google 로그인 페이지로 리다이렉트
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
      } else {
        const errorData = await response.json();
        alert(`회원가입 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      alert('회원가입 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupInfo(null);
    navigate('/', { replace: true });
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
        <Route path="/settings" element={<Settings userInfo={userInfo} handleDeleteAccount={handleDeleteAccount} />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
      {showPopup && popupInfo && (
        <Popup
          info={popupInfo}
          onRegister={handleRegister}
          onClose={handleClosePopup}
        />
      )}
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