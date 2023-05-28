const axios = require('axios');

const PredictModel = require('../models/predict.model');
const RatingModel = require('../models/rating.model');

const RecommendController = {};


RecommendController.getRecommend = async (req, res) => {
  const startTime = new Date()
  const { id } = req.user;

  const ratingsData = await RatingModel.findAll({
    attributes: ['userId', 'movieId', 'rating']
  });

  if(!ratingsData) {
    return res
    .status(500)
    .json({error: 'Server error. Pls try again'})
  }

  const predictsData = await axios.post('http://localhost:4000/api/recommend', {
    ratingsList: ratingsData,
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log('Error: ', error.message );
    })

  if(!predictsData) {
    return res
    .status(500)
    .json({error: 'Server error. Pls try again'})
  }

  const result = await PredictModel.bulkCreate(predictsData.data, {
    fields:["userId", "recommendations"] ,
    updateOnDuplicate: ["recommendations"] 
  })

  if(!result) {
    return res
    .status(500)
    .json({error: 'Server error. Pls try again'})
  }

  const userPredicts = await PredictModel.findOne({
    attributes: ["userId","recommendations"],
    where: {
      userId: id,
    }
  })

  if(!userPredicts){
    return res
    .status(404)
    .json({error: 'Not found the user'})
  }
  const endTime = new Date()
  console.log('Execute time: ', endTime.getTime() - startTime.getTime());
  return res.status(200).json({data: userPredicts})
}

RecommendController.getTopRatingByUserId = async (req, res) => {
  const { id } = req.user;

  const userPredicts = await PredictModel.findOne({
    attributes: ["userId", "recommendations"],
    where: {
      userId: id,
    }
  })

  if(!userPredicts){
    return res
    .status(404)
    .json({error: 'Not found the user'})
  }

  return res.status(200).json({data: userPredicts});
}



module.exports = RecommendController;