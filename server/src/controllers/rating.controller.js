const RatingModel = require('../models/rating.model');

const RatingController = {};

RatingController.getRating = async (req, res) => {
  const user = req.user;
  const { movieId } = req?.params;

  const rating = await RatingModel.findOne({
    attributes: ['rating'],
    where: {
      userId: user.userId,
      movieId,
    }
  })

  return res
    .status(200)
    .json({data: {rating: rating || 0}})
}

RatingController.updateRating = async (req, res) => {
  const { id } = req.user;
  const { movieId } = req?.params;
  const newRating = req.body.rating;
  
  if(newRating === null || newRating === undefined || newRating < 0) {
    return res
    .status(404)
    .json({error: 'Rating is incorrect'})
  }

  const isDelete = newRating === 0;
  let updateRating;

  if (isDelete) {
    updateRating = await RatingModel.destroy({
      where: {
        userId: id,
        movieId,
      }
    });
  } else {
    updateRating = await RatingModel.upsert({userId: id, movieId, rating: newRating})
  }

  if(!updateRating) {
    return res
      .status(500)
      .json({error: 'Server error. Pls try again'})
  }

  return res
    .status(200)
    .json({data: 'Update rating success'})
}


module.exports = RatingController;