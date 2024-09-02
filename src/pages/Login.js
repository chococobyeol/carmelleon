import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      console.log('User logged in:', response.data);
      // 로그인 성공 시, 필요한 동작 (예: 리다이렉트)
      // 예: window.location.href = "/dashboard";
    } catch (error) {
      console.error('Error logging in user:', error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <form onSubmit={loginUser}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;