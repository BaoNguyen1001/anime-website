const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/auth.middleware');
const RecommendController = require('../controllers/recommend.controller');

const isAuth = AuthMiddleware.isAuth;
const isRating = AuthMiddleware.isRating;

router.get('', isAuth, RecommendController.getRecommend);
router.get('/top-rating', isAuth, RecommendController.getTopRatingByUserId)
module.exports = router;