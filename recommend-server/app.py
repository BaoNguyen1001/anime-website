
from flask import abort, jsonify, redirect, render_template, request, url_for
from flask_migrate import Migrate
import sys
import findspark
findspark.init()
findspark.find()
from pyspark import SparkContext, SparkConf
from pyspark.sql import SparkSession
from init import create_app
from models import db, Ratings, Predicts
from engine import RecommendationEngine
from datetime import datetime

# def init_spark_context():
#     # load spark context
#     conf = SparkConf().setAppName("recommendation-server")
#     # IMPORTANT: pass aditional Python modules to each worker
#     sc = SparkContext(conf=conf, pyFiles=['app.py'])
#     print(sc)
#     return sc

def init_spark_context():
    spark = SparkSession.builder \
        .master("local[2]") \
        .appName("recommendation-server") \
        .enableHiveSupport() \
        .getOrCreate()
    sc = spark.sparkContext
    return sc, spark
#test_config="test"
app = create_app(test_config = None)
db.init_app(app)
migrate = Migrate(app, db)
sc, spark = init_spark_context()
recommendEngine = RecommendationEngine(sc, spark, app)

def convert_to_predict_obj(obj):
    return Predicts(userId = obj["userId"], recommendations = obj["recommendations"])

@app.route("/api/recommend", methods=["GET"])
def getRating():
    predictsData = []
    ratingsData = []
    error = False
    startTime
    endTime
    try:
        startTime = datetime.now()
        ratingResponse = Ratings.query.all()
        for rating in ratingResponse:
            ratingsData.append(rating.to_json())

        recommendResults = recommendEngine.train_model(ratingsData)
        predictsData = map(convert_to_predict_obj, recommendResults)
        predictsData = list(predictsData)

        db.session.query(Predicts).delete()
        db.session.add_all(predictsData)
        db.session.commit()
        
        
    except Exception as e:
        error = True
        db.session.rollback()
        print(sys.exc_info())
    finally:
        db.session.close()
        endTime = datetime.now()
        if error:
            abort(400)
        else:
            print('Updated the predicts database')
            print('Execute time: ' + str(endTime - startTime))
            return jsonify(recommendResults), 200


@app.route("/api/top-rating/<int:user_id>", methods=["GET"])
def getTopRating(user_id):
    data = db.get_or_404(Predicts, user_id)
    if (data):
      return jsonify(data.to_json()), 200
    else:
      return data


if __name__ == "__main__":
    app.run(host="0.0.0.0")






