const client = require('../configs/database.config');
const QueriesDatabase = require('../constants/queries');

const MovieModel = {};

MovieModel.getRating = async (userid, movieid) => {
  const query = {
    text: QueriesDatabase.GET_RATING_BY_USER,
    values: [userid, movieid],
  }

  const result = await client.query(query)
    .then((res) => {
      return res.rows[0];
    })
    .catch((e) => {
      return e;
    })

    return result;
}


MovieModel.updateRating = async (userid, movieid, rating, isUpdate = false, isDelete = false) => {
  const query = {
    text: isDelete ? QueriesDatabase.DELETE_RATING_BY_USER :  isUpdate ? QueriesDatabase.UPDATE_RATING_BY_USER : QueriesDatabase.INSERT_RATING_BY_USER,
    values: isDelete ? [userid, movieid] : [userid, movieid, rating],
  };

  const result = await client.query(query)
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
      return false;
    })

  return result;
}

module.exports = MovieModel;


const Sequelize = require('sequelize');
const db = require('../configs/database.config');

