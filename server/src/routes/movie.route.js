const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/auth.middleware');
const MovieController = require('../controllers/movie.controller');

const isAuth = AuthMiddleware.isAuth;
const isRating = AuthMiddleware.isRating;

// router.get('/info/:movieid', isRating, isAuth, MovieController.getRating);
// router.post('/info/:movieid', isAuth, MovieController.updateRating);

module.exports = router;