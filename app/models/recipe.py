from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
class Recipe(db.Model):
    __tablename__ = 'recipes'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    prep_time = db.Column(db.Integer, nullable=False)
    cook_time = db.Column(db.Integer, nullable=False)
    servings = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)
    
    users = db.relationship('User', back_populates='user')
    reviews = db.relationship('Review', back_populates='recipe', lazy=True, cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='recipe', lazy=True, cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='recipe', lazy=True, cascade='all')
    directions = db.relationship('Direction', back_populates='recipe', lazy=True, cascade='all')
    recipe_ingredients = db.relationship('RecipeIngredient', back_populates='recipe', lazy=True, cascade='all')
    
    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description': self.description,
            'prep_time': self.prep_time,
            'cook_time': self.cook_time,
            'servings': self.servings,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'reviews': [review.to_dict() for review in self.reviews],
            'comments': [comment.to_dict() for comment in self.comments],
            'likes': [like.to_dict() for like in self.likes],
            'directions': [direction.to_dict() for direction in self.directions],
            'recipe_ingredients': [ingredient.to_dict() for ingredient in self.recipe_ingredients]
        }
