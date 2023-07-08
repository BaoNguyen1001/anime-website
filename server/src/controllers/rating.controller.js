const RatingModel = require("../models/rating.model");
const response = require("../constants/response");
const RatingController = {};
const { Op } = require("sequelize");

RatingController.getRating = async (req, res) => {
  const user = req.user;
  const { movieId } = req?.params;

  const ratings = await RatingModel.findOne({
    attributes: ["rating"],
    where: {
      userId: user.id,
      movieId,
    },
  });
  return response(res, 200, { rating: ratings?.rating || 0 });
};

RatingController.updateRating = async (req, res) => {
  const { id } = req.user;
  const { movieId } = req?.params;
  const newRating = req.body.rating;

  if (newRating === null || newRating === undefined || newRating < 0) {
    return response(res, 404, {}, "Rating is incorrect");
  }

  const isDelete = newRating === 0;
  let updateRating;

  if (isDelete) {
    updateRating = await RatingModel.destroy({
      where: {
        userId: id,
        movieId,
      },
    });
  } else {
    updateRating = await RatingModel.upsert({
      userId: id,
      movieId,
      rating: newRating,
    });
  }

  if (!updateRating) {
    return response(res, 500, {}, "Server error! Pls try again");
  }

  return response(res, 200, { rating: newRating });
};

RatingController.getListRating = async (req, res) => {
  const { id } = req.body;
  try {
    const ratingList = await RatingModel.findAll({
      attributes: ["movieId", "rating"],
      where: {
        userId: id,
        rating: {
          [Op.gt]: 0, // Greater than 0 condition
        },
      },
    });

    return response(res, 200, { ratingList: ratingList });
  } catch (err) {
    return response(res, 500, {}, "Server error! Pls try again");
  }
};

module.exports = RatingController;
