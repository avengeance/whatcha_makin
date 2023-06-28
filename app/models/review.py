from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)
    review = db.Column(db.String(255), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)
    
    users = db.relationship('User', back_populates='reviews', lazy=True)
    recipe = db.relationship('Recipe', back_populates='reviews', lazy=True, cascade='all, delete')
    
    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'recipe_id': self.recipe_id,
            'review': self.review,
            'stars': self.stars,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
