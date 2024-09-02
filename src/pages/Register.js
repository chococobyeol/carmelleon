import React, { useEffect } from 'react';

const Register = () => {
  useEffect(() => {
    console.log("Redirecting to Google OAuth...");
    window.location.href = "http://localhost:3001/auth/google"; // 여기에 서버의 OAuth 경로를 입력합니다.
  }, []);

  return (
    <div>
      <h2>Redirecting to Google Sign-Up...</h2>
    </div>
  );
};

export default Register;