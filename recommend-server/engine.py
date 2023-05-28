
from pyspark.ml.recommendation import ALS
from pyspark.ml.evaluation import RegressionEvaluator
import json
class RecommendationEngine:
  def __init__(self, sc, spark, app):
    self.app = app
    self.app.logger.info(
      f"---Starting up the Recommendation Engine---"
    )
    self.sc = sc
    self.spark = spark
    self.rank = 12
    self.maxIters = 10
    self.regParams = 0.1

  def __read_rating_data(self, ratingList):
    rdd = self.sc.parallelize(ratingList)
    ratingsDF = self.spark.createDataFrame(data = rdd)
    ratingsDF = ratingsDF.select(ratingsDF["userId"], ratingsDF["movieId"], ratingsDF["rating"])
    #print(ratingsDF.show(truncate=False))
    return ratingsDF
  
  def __init_model(self):
    model = ALS(rank = self.rank, maxIter = self.maxIters, regParam = self.regParams, userCol="userId", itemCol="movieId", ratingCol="rating")
    return model
  
  def __parse_to_json(self, predict_list):
    results = []
    for row in predict_list.collect():
      json_row = json.loads(row)
      results.append(json_row)
    return results
  
  def __calculate_rmse(self, model, ratingList):
    print("Start calculate the rmse")
    predictions = model.transform(ratingList)
    evaluator = RegressionEvaluator(metricName="rmse", labelCol="rating",
                               predictionCol="prediction")
    rmse = evaluator.evaluate(predictions)
    print("Root-mean-square error = " + str(rmse))

  def train_model(self, ratingList):
    self.app.logger.info(
      f"---Training the ALS model with the current database---"
    )
    ratingsDF = self.__read_rating_data(ratingList)
    model = self.__init_model()
    predictions = model.fit(ratingsDF)
    predictions.setColdStartStrategy("drop");
    self.__calculate_rmse(predictions, ratingsDF)
    list_predict_rating = predictions.recommendForAllUsers(100).toJSON()
    results = self.__parse_to_json(list_predict_rating)
    return results


  def get_top_rating(self):
    #user_predict_rating = self.predictions.recommendForUserSubset([userId], 3)
    pass
