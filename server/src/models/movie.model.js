const Sequelize = require('sequelize');
const db = require('../configs/database.config');


const MovieModel = db.sequelize.define( "movie", {
  animeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  genre: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  episodes: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  members: {
    type: Sequelize.INTEGER,
    allowNull: true,
  }
})

module.exports = MovieModel;