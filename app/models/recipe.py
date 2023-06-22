from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class  Recipe(db.Model):
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
    
    owner = db.relationship('User', backref='recipes', lazy=True)
    reviews = db.relationship('Review', backref='recipe', lazy=True)
    comments = db.relationship('Comment', backref='recipe', lazy=True)
    likes = db.relationship('Like', backref='recipe', lazy=True)
    directions = db.relationship('Direction', backref='recipe', lazy=True)
    recipe_ingredients = db.relationship('RecipeIngredient', backref='recipe', lazy=True)
    
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
