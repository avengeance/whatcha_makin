from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Direction(db.Model):
    __tablename__ = 'directions'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    recipeId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)
    step = db.Column(db.Integer, nullable=False)
    stepInfo = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now)
    updatedAt = db.Column(db.DateTime, default=datetime.now)
    
    def to_dict(self):
        return {
            'id': self.id,
            'recipeId': self.recipe_id,
            'step': self.step,
            'stepInfo': self.step_info,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
