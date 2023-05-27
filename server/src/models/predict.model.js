const Sequelize = require('sequelize');
const db = require('../configs/database.config');


const PredictModel = db.sequelize.define( "predicts", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  recommendations: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: true
  }
})

module.exports = PredictModel;