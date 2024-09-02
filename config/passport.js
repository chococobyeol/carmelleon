// passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // User 모델을 가져옵니다.

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Google 프로필 정보를 사용하여 사용자를 찾거나 새로 만듭니다.
    let user = await User.findOne({ where: { googleId: profile.id } });
    
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value, // 이메일 정보는 profile.emails[0].value에 저장되어 있습니다.
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});