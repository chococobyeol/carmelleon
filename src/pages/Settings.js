// src/pages/Settings.js
import React, { useState } from 'react';
import './Settings.css';

const Settings = ({ userInfo, handleDeleteAccount }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteAccount = async () => {
    if (window.confirm('정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      setIsDeleting(true);
      await handleDeleteAccount();
      setIsDeleting(false);
    }
  };

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="settings-container">
      <h1>계정 설정</h1>
      <div className="user-info">
        <p><strong>사용자 이름:</strong> {userInfo.name}</p>
        <p><strong>이메일:</strong> {userInfo.email}</p>
      </div>
      <div className="delete-account">
        <button onClick={onDeleteAccount} disabled={isDeleting}>
          {isDeleting ? '처리 중...' : '회원 탈퇴'}
        </button>
      </div>
    </div>
  );
};

export default Settings;