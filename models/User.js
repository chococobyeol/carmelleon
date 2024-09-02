// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // db.js에서 정의한 sequelize 인스턴스를 가져옵니다.

const User = sequelize.define('User', {
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  // 옵션들 (필요에 따라 정의)
  timestamps: true,
});

module.exports = User;