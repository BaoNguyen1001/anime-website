const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const db = require('./configs/database.config');
const authRouter = require('./routes/auth.route');
const movieRouter = require('./routes/movie.route');
const ratingRouter = require('./routes/rating.route');
const recommendRouter = require('./routes/recommend.route');

dotenv.config();

// client.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected to database!");
// });

const app = express()

app.use(bodyParser.json())
app.use(cors())

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync().then(() => {
  console.log("db has been re sync")
})


app.get('/', (req, res) => {
  res.send('SERVER IS RUNNING')
})

app.use('/api/auth', authRouter);
//app.use('/api/movie', movieRouter);
app.use('/api/movie', ratingRouter);
app.use('/api/recommend', recommendRouter);

const server = app.listen(process.env.SERVER_PORT, () => {
  console.log(`Express running on ${server.address().port}`)
})
