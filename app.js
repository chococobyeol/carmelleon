// app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path'); // 추가: 경로 설정을 위해 필요
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
  origin: process.env.REACT_APP_FRONTEND_URL.replace(/\/$/, ''), // 끝에 슬래시를 제거
  credentials: true,
}));

// JSON 파싱 미들웨어
app.use(express.json());

// 세션 설정
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // 로그인 시에만 세션 생성
  cookie: {
    secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서는 HTTPS를 사용해야만 쿠키가 전송됨
    httpOnly: true, // 클라이언트 자바스크립트에서 쿠키 접근 불가
    sameSite: 'None', // CORS와 함께 쿠키를 사용하려면 None으로 설정
    maxAge: 1000 * 60 * 60, // 1시간 동안 유효
  },
}));

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// Auth Routes 사용
app.use('/auth', authRoutes);

// API 라우트
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

// 사용자 생성 API
app.post('/api/users', async (req, res) => {
  try {
    const { googleId, email, name } = req.body;

    const existingUser = await User.findOne({ where: { googleId } });
    if (existingUser) {
      return res.status(400).json({ message: '이미 등록된 사용자입니다.' });
    }

    const newUser = await User.create({
      googleId,
      email,
      username: name,
    });

    res.status(201).json({ message: '회원가입이 완료되었습니다.', userId: newUser.id });
  } catch (error) {
    console.error('사용자 생성 중 오류 발생:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.' });
  }
});

// 사용자 삭제 API
app.delete('/api/user', async (req, res) => {
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

    await user.destroy();
    res.json({ message: 'User successfully deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 정적 파일 제공 및 React 라우트 처리
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 데이터베이스 연결 및 서버 시작
const PORT = process.env.PORT || 3001;

db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('데이터베이스 연결에 실패했습니다:', err);
});