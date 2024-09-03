// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ where: { googleId: profile.id } });
      
      if (existingUser) {
        return done(null, existingUser);
      } else {
        // 새 사용자 정보를 임시 객체로 반환
        return done(null, {
          id: 'temp_' + profile.id,  // 임시 ID 추가
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          isNewUser: true
        });
      }
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  // user가 임시 객체인 경우에도 직렬화할 수 있도록 함
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // 임시 ID인 경우 임시 객체 반환
    if (typeof id === 'string' && id.startsWith('temp_')) {
      return done(null, { id, isNewUser: true });
    }
    
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;