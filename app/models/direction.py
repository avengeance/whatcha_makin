from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Direction(db.Model):
    __tablename__ = 'directions'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)
    step = db.Column(db.Integer, nullable=False)
    step_info = db.Column(db.String(5000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)
    
    recipe = db.relationship('Recipe', back_populates='directions', lazy=True, cascade='all, delete')
    
    def to_dict(self):
        return {
            'id': self.id,
            'recipe_id': self.recipe_id,
            'step': self.step,
            'step_info': self.step_info,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
