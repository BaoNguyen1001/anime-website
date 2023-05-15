const Sequelize = require('sequelize');
const db = require('../configs/database.config');


const RatingModel = db.sequelize.define( "ratings", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  movieId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

module.exports = RatingModel;