const QueriesDatabase = {
  GET_USER: "SELECT * FROM users WHERE username = $1",
  ADD_USER: "INSERT INTO users(username, password) VALUES($1, $2)",
  UPDATE_REFRESH_TOKEN: "UPDATE users SET refreshtoken = $1 WHERE username = $2",
  GET_RATING_BY_USER: 'SELECT * FROM rating WHERE userid = $1 AND movieid = $2',
  INSERT_RATING_BY_USER: 'INSERT INTO public.rating(userid, movieid, rating) VALUES($1, $2, $3)',
  UPDATE_RATING_BY_USER: 'UPDATE rating SET rating = $3 WHERE userid = $1 AND movieid = $2',
  DELETE_RATING_BY_USER: 'DELETE FROM rating WHERE userid = $1 AND movieid = $2',
}

module.exports = QueriesDatabase;