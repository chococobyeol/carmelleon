// src/components/Popup.js
import React from 'react';
import './Popup.css';

const Popup = ({ info, onRegister, onClose }) => {
  const handleRegister = () => {
    onRegister();
  };

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>회원 정보 없음</h2>
        <p>Google 계정으로 로그인을 시도하셨지만, 등록된 계정이 없습니다.</p>
        <p>이 정보로 새 계정을 만드시겠습니까?</p>
        <p><strong>이름:</strong> {info.name}</p>
        <p><strong>이메일:</strong> {info.email}</p>
        <div className="popup-buttons">
          <button onClick={handleRegister}>새 계정 만들기</button>
          <button onClick={handleClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;