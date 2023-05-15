// const client = require('../configs/database.config');
// const QueriesDatabase = require('../constants/queries');
// const UserModels = {};

// UserModels.getUser = async (username) => {
//   const query =  {
//     text: QueriesDatabase.GET_USER,
//     values: [username],
//   };

//   const result = await client.query(query)
//     .then((res) => {
//       return res.rows[0];
//     })
//     .catch((e) => {
//       return e;
//     })
//   return result;  
// }

// UserModels.addUser = async (newUser) => {
//   const query = {
//     text: QueriesDatabase.ADD_USER,
//     values: [newUser.username, newUser.password],
//   };

//   const result = await client.query(query)
//     .then(() => {
//       return true;
//     })
//     .catch(() => {
//       return false
//     })

//     return result;
// }


// UserModels.updateRefreshToken = async (username, refreshToken) => {
//   const query = {
//     text: QueriesDatabase.UPDATE_REFRESH_TOKEN,
//     values: [refreshToken, username],
//   };

//   const result = await client.query(query)
//     .then(() => {
//       return true;
//     })
//     .catch(() => {
//       return false;
//     })

//   return result;
// }

// module.exports = UserModels;

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