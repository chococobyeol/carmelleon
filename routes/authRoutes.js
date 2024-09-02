// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.get('/google', (req, res, next) => {
  const mode = req.query.mode;
  const state = mode ? Buffer.from(JSON.stringify({mode})).toString('base64') : undefined;
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: state
  })(req, res, next);
});

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3002/login' }),
  async (req, res) => {
    const state = req.query.state ? JSON.parse(Buffer.from(req.query.state, 'base64').toString()) : {};
    const mode = state.mode;

    if (mode === 'signup' && req.user.isNewUser) {
      // 새 사용자 등록 로직
      // 예: 추가 정보 입력 페이지로 리다이렉트
      res.redirect('http://localhost:3002/complete-signup');
    } else {
      // 기존 로그인 로직
      const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.redirect(`http://localhost:3002?token=${token}`);
    }
  }
);

module.exports = router;