const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/auth.middleware");
const RatingController = require("../controllers/rating.controller");

const isAuth = AuthMiddleware.isAuth;
const isRating = AuthMiddleware.isRating;

router.get("/rating/:movieId", isRating, isAuth, RatingController.getRating);
router.post("/rating/:movieId", isAuth, RatingController.updateRating);
router.get("/list", RatingController.getListRating);

module.exports = router;
