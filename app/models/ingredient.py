from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Ingredient(db.Model):
    __tablename__ = 'ingredients'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    is_seasoning = db.Column(db.Boolean, nullable=False)
    
    recipe_ingredients = db.relationship('RecipeIngredient', back_populates='ingredients', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'is_seasoning': self.is_seasoning,
            'recipe_ingredients': [recipe_ingredient.id for recipe_ingredient in self.recipe_ingredients]
        }
