from ..models.db import db
from ..models.ingredient import Ingredient
from ..models.recipe import Recipe
from ..models.direction import Direction
from ..models.recipeImages import RecipeImage
from ..models.review import Review
from ..models.comment import Comment
from ..models.like import Like
from ..models.recipeIngredient import RecipeIngredient

from flask import Blueprint, redirect, url_for, render_template, jsonify, request
from flask_login import login_required, current_user, logout_user

import json

recipe_routes = Blueprint('recipes', __name__)

# View all recipes
@recipe_routes.route('/', methods=['GET'])
def get_all_recipes():
    recipes = Recipe.query.all()
    recipe_list = []
    
    for recipe in recipes:
        images = RecipeImage.query.filter_by(recipe_id=recipe.id).all()
        reviews = Review.query.filter_by(recipe_id=recipe.id).all()
        comments = Comment.query.filter_by(recipe_id=recipe.id).all()
        
        images_list = [{"id": image.id, "url": image.url, "is_preview":image.is_preview} for image in images]
    
