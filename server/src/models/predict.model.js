const Sequelize = require('sequelize');
const db = require('../configs/database.config');


const PredictModel = db.sequelize.define( "predict", {
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
  predictRating: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = PredictModel;