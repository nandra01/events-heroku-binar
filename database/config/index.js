const Sequelize = require('sequelize');

const userModel = require('../models/userModel');
const eventModel = require('../models/eventModel');

// 1. open connection sequelize
const sequelize = new Sequelize(
  'd1mbe9hjqv08ou', //nama database
  'zenjbufrcoqoqz', //username
  'fa6f51b8100204113f3d25039bdb1426623090de22ecb350dfc2c6a8c7ff55f6', {// password
  host: 'ec2-52-0-114-209.compute-1.amazonaws.com',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// 2. test connection sequelize
sequelize.authenticate()
  .then((res) => console.log('Connection has been established successfully. ', res))
  .catch((err) => console.error('Unable to connect to the database:', err))


// export model yang sudah di gabungkan dengan sequelize
module.exports = {
  userModel: userModel(sequelize,Sequelize.DataTypes),
  eventModel: eventModel(sequelize, Sequelize.DataTypes)
}