from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class RecipeIngredient(db.Model):
    __tablename__ = 'recipe_ingredients'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)
    ingredient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('ingredients.id')), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    measurement = db.Column(db.String(255), nullable=False)
    
    recipe = db.relationship('Recipe', back_populates='recipe_ingredients', lazy=True)
    ingredients = db.relationship('Ingredient', back_populates='recipe_ingredients', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'recipe_id': self.recipe_id,
            'ingredient_id': self.ingredient_id,
            'quantity': self.quantity,
        }
