const {Sequelize} = require('sequelize');
const DataTypes = require('sequelize');

const dbConfig = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "admin",
  DB: "recommendation_system",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }  
});

const db = {}
db.sequelize = sequelize

module.exports = db;
