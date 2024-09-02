require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const db = require('./db'); // sequelize 인스턴스
require('./config/passport'); // passport 설정 파일
const authRoutes = require('./routes/authRoutes'); // authRoutes 설정

const app = express();

// 환경 변수 확인 로그
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3001', // React 앱의 URL
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