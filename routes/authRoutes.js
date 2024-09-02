const express = require('express');
   const passport = require('passport');

   const router = express.Router();

   // Google OAuth 로그인 라우트
   router.get('/google', (req, res, next) => {
     console.log('Google OAuth route hit');
     passport.authenticate('google', {
       scope: ['profile', 'email'],
     })(req, res, next);
   });

   // Google OAuth 로그인 콜백 라우트
   router.get('/google/callback', 
     (req, res, next) => {
       console.log('Google OAuth callback route hit');
       passport.authenticate('google', { failureRedirect: '/' })(req, res, next);
     },
     (req, res) => {
       console.log('Google OAuth authentication successful');
       res.redirect('/');
     }
   );

   module.exports = router;