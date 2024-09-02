import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });
      console.log('User registered:', response.data);
      // 회원가입 성공 시, 필요한 동작 (예: 리다이렉트)
      // 예: window.location.href = "/login";
    } catch (error) {
      console.error('Error registering user:', error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <form onSubmit={registerUser}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;