// src/pages/Register.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [googleInfo, setGoogleInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const googleId = searchParams.get('googleId');
    const email = searchParams.get('email');
    const name = searchParams.get('name');

    if (googleId && email && name) {
      setGoogleInfo({ googleId, email, name });
    }
  }, [location]);

  const handleGoogleSignUp = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  const handleCompleteSignUp = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(googleInfo),
      });

      if (response.ok) {
        alert('회원가입이 완료되었습니다. 로그인 해주세요.');
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(`회원가입 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      alert('회원가입 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <div className="register-container">
      <h2>회원가입</h2>
      {googleInfo ? (
        <div>
          <p>Google 계정으로 로그인을 시도하셨지만, 등록된 계정이 없습니다.</p>
          <p>이 정보로 새 계정을 만드시겠습니까?</p>
          <p>이름: {googleInfo.name}</p>
          <p>이메일: {googleInfo.email}</p>
          <button onClick={handleCompleteSignUp}>새 계정 만들기</button>
          <button onClick={() => navigate('/login')}>취소</button>
        </div>
      ) : (
        <button className="google-sign-in" onClick={handleGoogleSignUp}>
          <svg className="google-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            <path d="M1 1h22v22H1z" fill="none"/>
          </svg>
          <span>Google 계정으로 계속하기</span>
        </button>
      )}
    </div>
  );
};

export default Register;