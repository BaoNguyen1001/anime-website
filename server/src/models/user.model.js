const Sequelize = require('sequelize');
const db = require('../configs/database.config');


const UserModel = db.sequelize.define( "user", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  gender: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  refreshToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
})

module.exports = UserModel;