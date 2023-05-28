
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
app = create_app()
sc, spark = init_spark_context()
recommendEngine = RecommendationEngine(sc, spark, app)

def convert_to_predict_obj(obj):
    return Predicts(userId = obj["userId"], recommendations = obj["recommendations"])


@app.route("/api/recommend", methods=["POST"])
def getRecommend():
    try:
        reqData = request.json
        ratingsList = reqData["ratingsList"]
        recommendResults = recommendEngine.train_model(ratingsList)
        return jsonify(recommendResults), 200
    
    except Exception as e:
        print(sys.exc_info())
        abort(400)


if __name__ == "__main__":
    app.run(host="0.0.0.0")






