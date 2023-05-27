from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import JSONB, ARRAY
# session_options={"expire_on_commit": False} =>
# would allow to manipulate out of date models
# after a transaction has been committed
# ! be aware that the above can have unintended side effects
db = SQLAlchemy()

class Ratings(db.Model):
  __tablename__ = "ratings"

  userId = db.Column(
    db.Integer,
    primary_key=True,
    nullable=False
  )
  movieId = db.Column(
    db.Integer,
    primary_key=True,
    nullable=False
  )
  rating = db.Column(
    db.Integer,
    nullable=False
  )
  
  def __repr__(self):
    return f"<Ratings {self.userId}, {self.movieId}, {self.rating}>"
  
  def to_json(self):
    return {
      "userId": self.userId,
      "movieId": self.movieId,
      "rating": self.rating
    }
  

  
class Predicts(db.Model):
  __tablename__ = "predicts"

  userId = db.Column(
    db.Integer,
    primary_key=True,
    nullable=False
  )
  recommendations = db.Column(
    ARRAY(JSONB)
  )
  
  def __repr__(self):
    return f"<Predicts {self.userId}, {self.recommendations}>"
  
  def to_json(self):
    return {
      "userId": self.userId,
      "recommendations": self.recommendations
    }