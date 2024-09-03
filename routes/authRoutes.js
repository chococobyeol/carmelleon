// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: `${process.env.REACT_APP_FRONTEND_URL}/login` }),
  (req, res) => {
    if (req.user.isNewUser) {
      // 새 사용자인 경우, 프론트엔드로 정보를 전달
      return res.redirect(`${process.env.REACT_APP_FRONTEND_URL}?error=no_user&googleId=${req.user.googleId}&email=${req.user.email}&name=${req.user.name}`);
    } else {
      // 기존 사용자인 경우, 로그인 처리
      const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.redirect(`${process.env.REACT_APP_FRONTEND_URL}?token=${token}`);
    }
  }
);

module.exports = router;