from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class  Recipe(db.Model):
    __tablename__ = 'recipes'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    prep_time = db.Column(db.Integer, nullable=False)
    cook_time = db.Column(db.Integer, nullable=False)
    servings = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now)
    updatedAt = db.Column(db.DateTime, default=datetime.now)
    
    reviews = db.relationship('Review', backref='recipe', lazy=True)
    comments = db.relationship('Comment', backref='recipe', lazy=True)
    likes = db.relationship('Like', backref='recipe', lazy=True)
    directions = db.relationship('Direction', backref='recipe', lazy=True)
    recipe_ingredients = db.relationship('RecipeIngredient', backref='recipe', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'name': self.name,
            'description': self.description,
            'prep_time': self.prep_time,
            'cook_time': self.cook_time,
            'servings': self.servings,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
