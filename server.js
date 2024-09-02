const express = require('express');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// PostgreSQL 연결
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.log(err));

// 데이터베이스 싱크
sequelize.sync();

// 라우트 설정
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));