// app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./db');
require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User');

const app = express();

// 환경 변수 확인 로그
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);

// CORS 설정
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002'],
  credentials: true,
}));

// 세션 설정
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// Auth Routes 사용
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Home Page');
});

// 사용자 정보 가져오기 API
app.get('/api/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ id: user.id, name: user.username, email: user.email });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// 사용자 목록 가져오기 API
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'createdAt']
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 데이터베이스 연결 및 서버 시작
db.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
  });
}).catch(err => {
  console.error('데이터베이스 연결에 실패했습니다:', err);
});